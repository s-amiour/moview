import type { Movie, ViewMode } from '../types';
import MovieCard from './MovieCard';

type MovieListProps = {
  movies: Movie[];
  viewMode?: ViewMode;
  onMovieClick?: (movie: Movie) => void;
};

export default function MovieList({ movies, viewMode = 'grid', onMovieClick }: MovieListProps) {
  if (movies.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">!</div>
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
