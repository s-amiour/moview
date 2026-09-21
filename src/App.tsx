import { useState } from 'react';
import { Movie } from './types';
import { SAMPLE_MOVIES } from './data/sampleMovies';
import MovieList from './components/MovieList';
import SearchBar from './components/SearchBar';

export default function App() {
  const [movies] = useState<Movie[]>(SAMPLE_MOVIES);
  const [query, setQuery] = useState('');
  const [minRating, setMinRating] = useState(0);

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(query.toLowerCase());
    const matchesRating = (movie.vote_average || 0) >= minRating;
    return matchesSearch && matchesRating;
  });

  return (
    <div className="app-layout">
      <header className="site-header">
        <div className="header-inner">
          <div className="brand-logo">
            <div className="logo-dot"></div>
            <h1 className="logo-text" style={{ fontSize: 'inherit', margin: 0 }}>CineGrid</h1>
          </div>
          <SearchBar query={query} onChange={setQuery} />
          <div className="header-actions">
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
      </header>

      <main className="main-container">
        <div className="stats-banner">
          <div className="stat-card">
            <div className="stat-info">
              <span className="stat-value">{filteredMovies.length}</span>
              <span className="stat-label">Movies Found</span>
            </div>
          </div>
        </div>
        <MovieList 
          movies={filteredMovies} 
          onMovieClick={(movie) => console.log('Prepare for Session 04 modal:', movie.id)} 
        />
      </main>
    </div>
  );
}