import { createContext, useContext, useEffect, useReducer, type ReactNode } from 'react';
import type { Movie, Theme } from '../types';
import * as storage from '../utils/storage';

type State = {
  favorites: Movie[];
  theme: Theme;
};

type Action =
  | { type: 'TOGGLE_FAVOURITE'; payload: Movie }
  | { type: 'SET_THEME'; payload: Theme };

type AppContextValue = {
  theme: Theme;
  toggleTheme: () => void;
  favorites: Movie[];
  toggleFavorite: (movie: Movie) => void;
  isFavorite: (id: number) => boolean;
};

function appReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'TOGGLE_FAVOURITE': {
      const id = action.payload.id;
      const inState = state.favorites.some((fav) => fav.id === id);
      const inStorage = storage.getFavorites().some((fav: Movie) => fav.id === id);
      // StrictMode runs reducers twice, so only write to storage on the first run.
      if (inState === inStorage) {
        storage.toggleFavorite(action.payload);
      }
      return { ...state, favorites: storage.getFavorites() };
    }
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    default:
      return state;
  }
}

function initState(): State {
  return { favorites: storage.getFavorites(), theme: storage.getTheme() };
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, undefined, initState);

  useEffect(() => {
    storage.setTheme(state.theme);
  }, [state.theme]);

  const value: AppContextValue = {
    theme: state.theme,
    toggleTheme: () => dispatch({ type: 'SET_THEME', payload: state.theme === 'dark' ? 'light' : 'dark' }),
    favorites: state.favorites,
    toggleFavorite: (movie) => dispatch({ type: 'TOGGLE_FAVOURITE', payload: movie }),
    isFavorite: (id) => state.favorites.some((fav) => fav.id === id),
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
