import { useState } from 'react';
import type { Movie } from '../types';
import { useOptionalAppContext } from '../context/AppContext';
import { getPosterUrl, getPlaceholderPoster } from '../data/sampleMovies';
// Icons
import Star from './icons/Star';
import EyeClosed from './icons/EyeClosed';
import Eye from './icons/Eye';

// Define component prop shape
interface MovieCardProps {
  movie: Movie;
  onClick?: () => void;
}


export default function MovieCard({ movie, onClick }: MovieCardProps) {
  const context = useOptionalAppContext();
  const [localFavourite, setLocalFavourite] = useState(false);
  const isFavourite = context ? context.isFavorite(movie.id) : localFavourite;

  const favouriteLabel = isFavourite ? 'Remove from favourites' : 'Add to favourites';
  const year = movie.release_date.substring(0, 4);

  const handleFavouriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();  // Prevent event from bubbling up to parent element(s) or capturing down to child element(s). Both actions mean triggering an element.
    if (context) {
      context.toggleFavorite(movie);
    } else {
      setLocalFavourite((prev) => !prev);
    }
  };

  return (
    <article className="movie-card" tabIndex={0} aria-label={`${movie.title} (${year})`} onClick={onClick}>
      {/* Poster Ref */}
      <div className="poster-wrapper">
        <img
          src={movie.poster_path ? getPosterUrl(movie.poster_path) : getPlaceholderPoster(movie.title)}
          alt={movie.title}
          className="poster-img"
        />
        <div className="poster-overlay">
          {/* Badges shown at top */}
          <div className="card-top-badges">
            {/* Rating */}
            <span className="rating-badge">
              <Star />
              {movie.vote_average.toFixed(1)}
            </span>
            {/* Watchlist Btn */}
            <button
              className={`favorite-btn ${isFavourite ? 'is-favorite' : ''}`}
              onClick={handleFavouriteClick}
              aria-label={favouriteLabel}
              title={favouriteLabel}
            >
              { isFavourite ? <EyeClosed /> : <Eye />}
            </button>
          </div>
          <span className="quick-view-hint">View Details</span>
        </div>
      </div>
      <div className="movie-card-info">
        <h2 className="movie-card-title">{movie.title}</h2>
        <div className="movie-card-meta">
          <span>{year}</span>
          <span>{movie.vote_count} votes</span>
        </div>
      </div>
    </article>
  );
}

