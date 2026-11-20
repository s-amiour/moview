import { useState } from 'react';
import { Movie } from '../types';
import { getPosterUrl } from '../data/sampleMovies';
import { getGenreNames } from '../data/genres';
// Icons
import Star from './icons/Star';
import EyeClosed from './icons/EyeClosed';
import Eye from './icons/Eye';

// Standard to define shape of props
type MovieCardProps = {
  movie: Movie;
  onClick?: () => void;
};


export default function MovieCard({ movie, onClick }: MovieCardProps) {
  const [isWatchlisted, setIsWatchlisted] = useState(false);

  const handleWatchlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsWatchlisted((prev) => !prev);
  };

  return (
    <article className="movie-card" tabIndex={0} aria-label={`${movie.title} (${movie.release_date?.substring(0, 4)})`} onClick={onClick}>
      {/* Poster Ref */}
      <div className="poster-wrapper">
        <img
          src={getPosterUrl(movie.poster_path)}
          alt={movie.title}
          className="poster-img"
        />
        <div className="poster-overlay">
          {/* Badges shown at top */}
          <div className="card-top-badges">
            {/* Rating */}
            <span className="rating-badge">
              <Star />
              {movie.vote_average?.toFixed(1) || 'N/A'}
            </span>
            {/* Watchlist Btn */}
            <button
              className={`favorite-btn ${isWatchlisted ? 'is-favorite' : ''}`}
              onClick={handleWatchlistClick}
              aria-label={isWatchlisted ? "Remove from Watchlist" : "Add to Watchlist"}
              title={isWatchlisted ? "Remove from Watchlist" : "Add to Watchlist"}
            >
              { isWatchlisted ? <EyeClosed /> : <Eye />}
            </button>
          </div>
          
          <span className="quick-view-hint">View Details</span>
        </div>
      </div>
      <div className="movie-card-info">
        <h2 className="movie-card-title">{movie.title}</h2>
        <div className="movie-card-meta">
          <span>{movie.release_date?.substring(0, 4) ?? ''}</span>
          <span>{movie.vote_count ?? 'N/A'} votes</span>
        </div>
        <div className="movie-card-tags">
          { getGenreNames(movie.genre_ids).map(genre => <span key={genre} className='genre-tag'>{genre}</span>) }
        </div>
      </div>
    </article>
  );
}
