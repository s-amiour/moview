import { useCallback, useState } from 'react';
import type { Movie, SortOption, ViewMode } from '../types';
import { AppProvider, useAppContext, useOptionalAppContext } from '../context/AppContext';
import { useMovies } from '../hooks/useMovies';
import Header from '../components/Header';
import FilterBar from '../components/FilterBar';
import StatsBanner from '../components/StatsBanner';
import MovieList from '../components/MovieList';
import MovieModal from '../components/MovieModal';
import ApiConfigModal from '../components/ApiConfigModal';

export default function HomePage() {
  const context = useOptionalAppContext();
  if (!context) {
    return (
      <AppProvider>
        <HomeContent />
      </AppProvider>
    );
  }
  return <HomeContent />;
}

function HomeContent() {
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('');
  const [sort, setSort] = useState<SortOption>('popularity');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isApiConfigOpen, setIsApiConfigOpen] = useState(false);
  const { favorites } = useAppContext();

  const { movies, totalResults, isLiveApi, isLoading, error } = useMovies(
    { search, genre, sort, onlyFavorites },
    onlyFavorites ? favorites : null,
  );

  const closeMovieModal = useCallback(() => setSelectedMovie(null), []);
  const closeApiConfig = useCallback(() => setIsApiConfigOpen(false), []);

  const pickRandomMovie = useCallback(() => {
    if (movies.length === 0) return;
    setSelectedMovie(movies[Math.floor(Math.random() * movies.length)]);
  }, [movies]);

  return (
    <>
      <Header
        search={search}
        onSearch={setSearch}
        onlyFavorites={onlyFavorites}
        onToggleFavorites={() => setOnlyFavorites((prev) => !prev)}
        onOpenApiConfig={() => setIsApiConfigOpen(true)}
        onPickRandom={pickRandomMovie}
        canPickRandom={!isLoading && !error && movies.length > 0}
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
        ) : (
          <MovieList movies={movies} viewMode={viewMode} onMovieClick={setSelectedMovie} />
        )}
      </main>

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeMovieModal} />
      )}

      {isApiConfigOpen && <ApiConfigModal onClose={closeApiConfig} onSave={closeApiConfig} />}
    </>
  );
}
