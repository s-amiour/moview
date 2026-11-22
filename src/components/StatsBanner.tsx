import { Database, Film, Globe, Star, Tag } from 'lucide-react';
import type { Movie } from '../types';
import { GENRES } from '../data/genres';
import styles from './StatsBanner.module.css';

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
    <section className={styles.banner} aria-label="Results summary">
      <div className={styles.card}>
        <div className={styles.icon}>
          <Film size={20} />
        </div>
        <div className={styles.info}>
          <span className={styles.value}>{totalResults.toLocaleString()}</span>
          <span className={styles.label}>{onlyFavorites ? 'Saved Movies' : 'Available Titles'}</span>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.icon} style={{ color: 'var(--star-gold)' }}>
          <Star size={20} />
        </div>
        <div className={styles.info}>
          <span className={styles.value}>{averageRating} / 10</span>
          <span className={styles.label}>Avg Page Rating</span>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.icon}>
          <Tag size={20} />
        </div>
        <div className={styles.info}>
          <span className={styles.value}>{genreName}</span>
          <span className={styles.label}>Selected Category</span>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.icon} style={{ color: '#3b82f6' }}>
          {isLiveApi ? <Globe size={20} /> : <Database size={20} />}
        </div>
        <div className={styles.info}>
          <span className={styles.value}>{isLiveApi ? 'Live TMDB API' : 'Local Data'}</span>
          <span className={styles.label}>Data Source</span>
        </div>
      </div>
    </section>
  );
}
