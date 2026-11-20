import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Movie, Theme } from '../types';
import * as storage from '../utils/storage';

type AppContextValue = {
  theme: Theme;
  toggleTheme: () => void;
  favorites: Movie[];
  toggleFavorite: (movie: Movie) => void;
  isFavorite: (id: number) => boolean;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => storage.getTheme());
  const [favorites, setFavorites] = useState<Movie[]>(() => storage.getFavorites());

  useEffect(() => {
    storage.setTheme(theme);
  }, [theme]);

  const value: AppContextValue = {
    theme,
    toggleTheme: () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark')),
    favorites,
    toggleFavorite: (movie) => setFavorites(storage.toggleFavorite(movie)),
    isFavorite: (id) => favorites.some((fav) => fav.id === id),
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used inside <AppProvider>');
  }
  return context;
}
