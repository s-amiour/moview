import { useState } from 'react';
import { useMovies } from './hooks/useMovies';
import NavBar from './components/NavBar';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';

export default function App() {
  const [query, setQuery] = useState('');
  const [minRating, setMinRating] = useState(0);
  const { movies, isLoading, error } = useMovies({
    search: query,
    genre: '',
    sort: 'popularity',
    onlyFavorites: false,
  });

  const filteredMovies = movies.filter((movie) => movie.vote_average >= minRating);

  return (
    <div className="app-layout">
      <NavBar />

      <main className="main-container">
        <div className="filter-bar" style={{ marginTop: '24px' }}>
          <SearchBar query={query} onChange={setQuery} />

          <div className="filter-actions-right">
            <div className="sort-select-wrapper">
              <select
                className="sort-select"
                aria-label="Minimum rating"
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

        {isLoading ? (
          <div className="empty-state" role="status">
            <p className="empty-text">Loading movies…</p>
          </div>
        ) : error ? (
          <div className="empty-state" role="alert">
            <div className="empty-icon">!</div>
            <p className="empty-title">Couldn&apos;t load movies</p>
            <p className="empty-text">{error}</p>
          </div>
        ) : (
          <MovieList movies={filteredMovies} />
        )}
      </main>
    </div>
  );
}
