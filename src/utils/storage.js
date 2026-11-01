export function getFavorites() {
  try {
    const stored = localStorage.getItem('favorites');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to parse favorites from localStorage', error);
    return [];
  }
}

export function toggleFavorite(movie) {
  const favorites = getFavorites();
  const existingIndex = favorites.findIndex((fav) => fav.id === movie.id);
  let updatedFavorites;

  if (existingIndex >= 0) {
    updatedFavorites = favorites.filter((fav) => fav.id !== movie.id);
  } else {
    updatedFavorites = [...favorites, movie];
  }

  try {
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  } catch (error) {
    console.error('Failed to save favorites to localStorage', error);
  }

  return updatedFavorites;
}

export function getTheme() {
  return localStorage.getItem('theme') || 'dark';
}

export function setTheme(theme) {
  localStorage.setItem('theme', theme);
  document.documentElement.setAttribute('data-theme', theme);
}

export function getApiKey() {
  return localStorage.getItem('tmdb_api_key') || '';
}

export function setApiKey(key) {
  localStorage.setItem('tmdb_api_key', key.trim());
}