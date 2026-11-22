import type { Movie, ViewMode } from '../types';
import MovieCard from './MovieCard';
import { QuestionMark } from 'lucide-react';

// Define component prop shape
interface MovieListProps {
  movies: Movie[];
  viewMode?: ViewMode;
  onMovieClick?: (movie: Movie) => void;
}

/**
 * @param movies, viewMode (grid by default), onMovieClick (onclick listener)
 * @returns MovieList
 */
export default function MovieList({ movies, viewMode = 'grid', onMovieClick }: MovieListProps) {
  if (!movies.length) {
    return (
      <div className="empty-state">
        <div className="empty-icon">
          <QuestionMark />
        </div>
        <p className="empty-text">No movies found.</p>
      </div>
    );
  }

  return (
    <div className={`movies-grid${viewMode === 'list' ? ' compact-view' : ''}`}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onClick={() => onMovieClick?.(movie)} />
      ))}
    </div>
  );
}
