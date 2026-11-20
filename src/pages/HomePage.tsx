import { useCallback, useState } from 'react';
import type { Movie, SortOption, Theme, ViewMode } from '../types';
import * as storage from '../utils/storage';
import { useMovies } from '../hooks/useMovies';
import Header from '../components/Header';
import FilterBar from '../components/FilterBar';
import StatsBanner from '../components/StatsBanner';
import MovieCard from '../components/MovieCard';
import MovieModal from '../components/MovieModal';
import ApiConfigModal from '../components/ApiConfigModal';

export default function HomePage() {
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('');
  const [sort, setSort] = useState<SortOption>('popularity');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [theme, setTheme] = useState<Theme>(() => storage.getTheme());
  const [favorites, setFavorites] = useState<Movie[]>(() => storage.getFavorites());
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isApiConfigOpen, setIsApiConfigOpen] = useState(false);

  const { movies, totalResults, isLiveApi, isLoading, error } = useMovies(
    { search, genre, sort, onlyFavorites },
    onlyFavorites ? favorites : null,
  );

  const handleToggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    storage.setTheme(next);
  };

  const handleToggleFavorite = (movie: Movie) => {
    setFavorites(storage.toggleFavorite(movie));
  };

  const closeMovieModal = useCallback(() => setSelectedMovie(null), []);
  const closeApiConfig = useCallback(() => setIsApiConfigOpen(false), []);

  return (
    <>
      <Header
        search={search}
        onSearch={setSearch}
        onlyFavorites={onlyFavorites}
        onToggleFavorites={() => setOnlyFavorites((prev) => !prev)}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        favCount={favorites.length}
        onOpenApiConfig={() => setIsApiConfigOpen(true)}
      />

      <main className="main-container">
        <StatsBanner
          movies={movies}
          totalResults={totalResults}
          genre={genre}
          onlyFavorites={onlyFavorites}
          isLiveApi={isLiveApi}
        />

        <FilterBar
          genre={genre}
          onGenreChange={setGenre}
          sort={sort}
          onSortChange={setSort}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

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
        ) : movies.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">!</div>
            <p className="empty-text">No movies found.</p>
          </div>
        ) : (
          <div className={`movies-grid${viewMode === 'list' ? ' compact-view' : ''}`}>
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} onClick={() => setSelectedMovie(movie)} />
            ))}
          </div>
        )}
      </main>

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          isFavorite={favorites.some((fav) => fav.id === selectedMovie.id)}
          onToggleFavorite={handleToggleFavorite}
          onClose={closeMovieModal}
        />
      )}

      {isApiConfigOpen && <ApiConfigModal onClose={closeApiConfig} onSave={closeApiConfig} />}
    </>
  );
}
