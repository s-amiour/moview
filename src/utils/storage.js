const KEYS = {
  favorites: 'cinegrid_favorites',
  theme: 'cinegrid_theme',
  apiKey: 'cinegrid_tmdb_api_key',
};

function read(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.error(`Failed to write "${key}" to localStorage`, error);
  }
}

export function getFavorites() {
  try {
    const parsed = JSON.parse(read(KEYS.favorites) ?? '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function toggleFavorite(movie) {
  const favorites = getFavorites();
  const updated = favorites.some((fav) => fav.id === movie.id)
    ? favorites.filter((fav) => fav.id !== movie.id)
    : [...favorites, movie];

  write(KEYS.favorites, JSON.stringify(updated));
  return updated;
}

export function getTheme() {
  return read(KEYS.theme) === 'light' ? 'light' : 'dark';
}

export function setTheme(theme) {
  write(KEYS.theme, theme);
  document.documentElement.setAttribute('data-theme', theme);
}

export function getApiKey() {
  return read(KEYS.apiKey) ?? '';
}

export function setApiKey(key) {
  write(KEYS.apiKey, key.trim());
}
