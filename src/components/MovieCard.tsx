import { useState } from 'react';
import { Movie } from '../types';
import { getPosterUrl } from '../data/sampleMovies';

type MovieCardProps = {
  movie: Movie;
  onClick?: () => void;
};

export default function MovieCard({ movie, onClick }: MovieCardProps) {
  const [isFavourite, setIsFavourite] = useState(false);

  const handleFavouriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavourite((prev) => !prev);
  };

  return (
    <article className="movie-card" onClick={onClick}>
      <div className="poster-wrapper">
        <img
          src={getPosterUrl(movie.poster_path)}
          alt={movie.title}
          className="poster-img"
        />
        <div className="poster-overlay">
          <div className="card-top-badges">
            <span className="rating-badge">
              <svg viewBox="0 0 24 24" width="13" height="13">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              {movie.vote_average?.toFixed(1) || 'N/A'}
            </span>
            <button
              className={`favorite-btn ${isFavourite ? 'is-favorite' : ''}`}
              onClick={handleFavouriteClick}
              aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"}
            >
              ♥
            </button>
          </div>
          <span className="quick-view-hint">Quick View</span>
        </div>
      </div>
      <div className="movie-card-info">
        <h2 className="movie-card-title">{movie.title}</h2>
        <div className="movie-card-meta">
          <span>{movie.release_date?.substring(0, 4)}</span>
        </div>
      </div>
    </article>
  );
}