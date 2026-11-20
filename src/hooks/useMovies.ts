import { useEffect, useState } from 'react';
import type { Movie, SortOption } from '../types';
import { movieService } from '../services/movieService';

export type MovieFilters = {
  search: string;
  genre: string;
  sort: SortOption;
  onlyFavorites: boolean;
};

export function useMovies(filters: MovieFilters, reloadKey: unknown = null) {
  const { search, genre, sort, onlyFavorites } = filters;
  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [isLiveApi, setIsLiveApi] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const localData = movieService.getLocalMovies({ search, genre, sort, onlyFavorites });
  const isLocal = localData !== null;

  useEffect(() => {
    if (isLocal) return;
    const controller = new AbortController();

    const loadMovies = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await movieService.fetchMovies(
          { search, genre, sort, onlyFavorites },
          { signal: controller.signal },
        );
        setMovies(data.results);
        setTotalResults(data.total_results);
        setIsLiveApi(data.isLiveApi);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        setMovies([]);
        setError(err instanceof Error ? err.message : 'Something went wrong while loading movies.');
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };

    loadMovies();
    return () => controller.abort();
  }, [search, genre, sort, onlyFavorites, reloadKey, isLocal]);

  if (localData) {
    return {
      movies: localData.results,
      totalResults: localData.total_results,
      isLiveApi: false,
      isLoading: false,
      error: null,
    };
  }

  return { movies, totalResults, isLiveApi, isLoading, error };
}
