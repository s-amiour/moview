import { useState } from 'react';
import { useMovies } from '../hooks/useMovies';
import MovieList from '../components/MovieList';
import SearchBar from '../components/SearchBar';

export default function HomePage() {
  const [query, setQuery] = useState('');
  const [minRating, setMinRating] = useState(0);
  
  const { movies, isLoading, error } = useMovies(query);

  const filteredMovies = movies.filter((movie) => {
    return (movie.vote_average || 0) >= minRating;
  });

  return (
    <main className="main-container">
      <div className="filter-bar" style={{ marginTop: '24px' }}>
        <SearchBar query={query} onChange={setQuery} />
        
        <div className="filter-actions-right">
          <div className="sort-select-wrapper">
            <select
              className="sort-select"
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
            >
              <option value={0}>All Ratings</option>
              <option value={6}>6+ Stars</option>
              <option value={7}>7+ Stars</option>
              <option value={8}>8+ Stars</option>
            </select>
          </div>
        </div>
      </div>

      <div className="stats-banner">
        <div className="stat-card">
          <div className="stat-info">
            <span className="stat-value">{isLoading ? '...' : filteredMovies.length}</span>
            <span className="stat-label">Movies Found</span>
          </div>
        </div>
      </div>
      
      {isLoading && <div style={{ textAlign: 'center', padding: '40px' }}>Loading movies...</div>}
      
      {error && (
        <div className="empty-state">
          <div className="empty-icon">!</div>
          <p className="empty-text" style={{ color: '#ef4444' }}>{error}</p>
        </div>
      )}

      {!isLoading && !error && (
        <MovieList 
          movies={filteredMovies} 
          onMovieClick={(movie) => console.log('Movie clicked:', movie.id)} 
        />
      )}
    </main>
  );
}