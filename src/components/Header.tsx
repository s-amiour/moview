import { NavLink } from 'react-router-dom';
import { Heart, Moon, Settings, Shuffle, Sun } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import SearchBar from './SearchBar';

type HeaderProps = {
  search: string;
  onSearch: (search: string) => void;
  onlyFavorites: boolean;
  onToggleFavorites: () => void;
  onOpenApiConfig: () => void;
  onPickRandom?: () => void;
  canPickRandom?: boolean;
};

export default function Header({
  search,
  onSearch,
  onlyFavorites,
  onToggleFavorites,
  onOpenApiConfig,
  onPickRandom,
  canPickRandom = true,
}: HeaderProps) {
  const { theme, toggleTheme, favorites } = useAppContext();
  const navClass = ({ isActive }: { isActive: boolean }) => `nav-link${isActive ? ' active' : ''}`;

  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="brand-logo">
          <div className="logo-dot"></div>
          <h1 className="logo-text" style={{ fontSize: 'inherit', margin: 0 }}>
            Moview
          </h1>
        </div>

        <nav className="header-nav" aria-label="Main">
          <NavLink to="/" end className={navClass}>
            Home
          </NavLink>
          <NavLink to="/about" className={navClass}>
            About
          </NavLink>
        </nav>

        <SearchBar query={search} onChange={onSearch} />

        <div className="header-actions">
          {onPickRandom && (
            <button
              type="button"
              className="btn-icon-label"
              aria-label="Open a random movie"
              title="Open a random movie"
              disabled={!canPickRandom}
              onClick={onPickRandom}
            >
              <Shuffle size={16} />
              Random
            </button>
          )}
          <button
            type="button"
            className={`btn-icon-label${onlyFavorites ? ' active' : ''}`}
            aria-pressed={onlyFavorites}
            onClick={onToggleFavorites}
          >
            <Heart size={16} fill={onlyFavorites ? 'currentColor' : 'none'} />
            Favourites
            <span className="count-badge">{favorites.length}</span>
          </button>
          <button type="button" className="btn-icon-label" onClick={onOpenApiConfig}>
            <Settings size={16} />
            API Key
          </button>
          <button
            type="button"
            className="theme-toggle-btn"
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            onClick={toggleTheme}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
}
