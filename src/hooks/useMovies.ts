import { useState, useEffect } from 'react';
import { Movie } from '../types';
import { movieService } from '../services/movieService';

export function useMovies(searchQuery: string = '') {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    
    const fetchMoviesData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await movieService.fetchMovies(
          { search: searchQuery },
          controller.signal
        );
        setMovies(response.results);
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMoviesData();

    return () => {
      controller.abort();
    };
  }, [searchQuery]);

  return { movies, isLoading, error };
}