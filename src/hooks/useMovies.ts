import { useEffect, useState } from 'react';
import type { Movie } from '../types';
import { movieService } from '../services/movieService';

export function useMovies() {
  const isLiveApi = movieService.isLiveApi();
  const [movies, setMovies] = useState<Movie[]>(() =>
    isLiveApi ? [] : movieService.getSampleMovies().results,
  );
  const [isLoading, setIsLoading] = useState(isLiveApi);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLiveApi) return;

    const controller = new AbortController();

    const loadMovies = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await movieService.fetchMovies({}, { signal: controller.signal });
        setMovies(data.results);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        setError(err instanceof Error ? err.message : 'Something went wrong while loading movies.');
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };

    loadMovies();
    return () => controller.abort();
  }, [isLiveApi]);

  return { movies, isLoading, error };
}
