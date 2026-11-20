import { useEffect } from 'react';
import { Heart, X, Youtube } from 'lucide-react';
import type { Movie } from '../types';
import { getBackdropUrl, getPlaceholderPoster, getPosterUrl } from '../data/sampleMovies';
import { getGenreNames } from '../data/genres';
import Star from './icons/Star';

type MovieModalProps = {
  movie: Movie;
  isFavorite: boolean;
  onToggleFavorite: (movie: Movie) => void;
  onClose: () => void;
};

export default function MovieModal({ movie, isFavorite, onToggleFavorite, onClose }: MovieModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    const previousOverflow = document.body.style.overflow;

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  const year = movie.release_date ? movie.release_date.substring(0, 4) : '';
  const releaseDate = movie.release_date
    ? new Date(movie.release_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : 'Unknown';
  const trailerUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(`${movie.title} ${year} trailer`)}`;

  return (
    <div
      className="modal-overlay active"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="modal-movie-title">
        <button type="button" className="modal-close-btn" aria-label="Close" onClick={onClose}>
          <X size={18} />
        </button>

        <div
          className="modal-backdrop-hero"
          style={{ backgroundImage: `url("${getBackdropUrl(movie.backdrop_path)}")` }}
        ></div>

        <div className="modal-body">
          <img
            src={movie.poster_path ? getPosterUrl(movie.poster_path) : getPlaceholderPoster(movie.title)}
            alt={movie.title}
            className="modal-poster"
          />

          <div className="modal-content-details">
            <h2 className="modal-title" id="modal-movie-title">
              {movie.title}
            </h2>

            <div className="modal-meta-row">
              <span className="rating-badge">
                <Star />
                {movie.vote_average.toFixed(1)}
              </span>
              <span className="modal-meta-item">{movie.vote_count.toLocaleString()} Ratings</span>
              <span className="modal-meta-item">Released {releaseDate}</span>
            </div>

            <div className="movie-genres-tags">
              {getGenreNames(movie.genre_ids).map((name, index) => (
                <span key={`${name}-${index}`} className="genre-tag">
                  {name}
                </span>
              ))}
            </div>

            <div className="modal-overview">
              <h3 className="modal-overview-heading">Overview</h3>
              <p>{movie.overview || 'No overview available.'}</p>
            </div>

            <div className="modal-footer-actions">
              <button type="button" className="btn-primary" onClick={() => onToggleFavorite(movie)}>
                <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} />
                {isFavorite ? 'Remove from Favourites' : 'Add to Favourites'}
              </button>
              <a href={trailerUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                <Youtube size={16} />
                Watch Trailer
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
