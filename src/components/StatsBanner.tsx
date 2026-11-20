import { Database, Film, Globe, Star, Tag } from 'lucide-react';
import type { Movie } from '../types';
import { GENRES } from '../data/genres';

type StatsBannerProps = {
  movies: Movie[];
  totalResults: number;
  genre: string;
  onlyFavorites: boolean;
  isLiveApi: boolean;
};

export default function StatsBanner({ movies, totalResults, genre, onlyFavorites, isLiveApi }: StatsBannerProps) {
  const averageRating = movies.length
    ? (movies.reduce((sum, movie) => sum + movie.vote_average, 0) / movies.length).toFixed(1)
    : '0.0';
  const genreName = genre ? GENRES[Number(genre)] ?? 'Unknown' : 'All Genres';

  return (
    <section className="stats-banner" aria-label="Results summary">
      <div className="stat-card">
        <div className="stat-icon">
          <Film size={20} />
        </div>
        <div className="stat-info">
          <span className="stat-value">{totalResults.toLocaleString()}</span>
          <span className="stat-label">{onlyFavorites ? 'Saved Movies' : 'Available Titles'}</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon" style={{ color: 'var(--star-gold)' }}>
          <Star size={20} />
        </div>
        <div className="stat-info">
          <span className="stat-value">{averageRating} / 10</span>
          <span className="stat-label">Avg Page Rating</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">
          <Tag size={20} />
        </div>
        <div className="stat-info">
          <span className="stat-value">{genreName}</span>
          <span className="stat-label">Selected Category</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon" style={{ color: '#3b82f6' }}>
          {isLiveApi ? <Globe size={20} /> : <Database size={20} />}
        </div>
        <div className="stat-info">
          <span className="stat-value">{isLiveApi ? 'Live TMDB API' : 'Local Data'}</span>
          <span className="stat-label">Data Source</span>
        </div>
      </div>
    </section>
  );
}
