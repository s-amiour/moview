import { SAMPLE_MOVIES } from '../data/sampleMovies';
import * as storage from '../utils/storage';

const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL || 'https://api.themoviedb.org/3';

export function sortMovies(movies, sort) {
  const sorted = [...movies];
  switch (sort) {
    case 'vote_average':
      return sorted.sort((a, b) => b.vote_average - a.vote_average);
    case 'release_date':
      return sorted.sort((a, b) => (b.release_date ?? '').localeCompare(a.release_date ?? ''));
    case 'title':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case 'popularity':
    default:
      return sorted.sort((a, b) => b.popularity - a.popularity);
  }
}

function filterLocally(movies, search, genre) {
  const query = search.trim().toLowerCase();
  return movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(query) &&
      (!genre || movie.genre_ids.includes(Number(genre))),
  );
}

function localResult(movies) {
  return {
    results: movies,
    total_pages: 1,
    total_results: movies.length,
    isLiveApi: false,
  };
}

function buildUrl(apiKey, { search, genre, page }) {
  const query = search.trim();
  let url;
  if (query) {
    url = new URL(`${BASE_URL}/search/movie`);
    url.searchParams.set('query', query);
  } else if (genre) {
    url = new URL(`${BASE_URL}/discover/movie`);
    url.searchParams.set('with_genres', String(genre));
  } else {
    url = new URL(`${BASE_URL}/movie/popular`);
  }
  url.searchParams.set('api_key', apiKey);
  url.searchParams.set('page', String(page));
  return url;
}

export const movieService = {
  getLocalMovies({ search = '', genre = '', sort = 'popularity', onlyFavorites = false } = {}) {
    if (onlyFavorites) {
      return localResult(sortMovies(filterLocally(storage.getFavorites(), search, ''), sort));
    }
    if (!storage.getApiKey()) {
      return localResult(sortMovies(filterLocally(SAMPLE_MOVIES, search, genre), sort));
    }
    return null;
  },

  async fetchMovies(
    { search = '', genre = '', sort = 'popularity', onlyFavorites = false, page = 1 } = {},
    { signal } = {},
  ) {
    const local = this.getLocalMovies({ search, genre, sort, onlyFavorites });
    if (local) {
      return local;
    }

    const apiKey = storage.getApiKey();

    const response = await fetch(buildUrl(apiKey, { search, genre, page }), { signal });
    if (!response.ok) {
      throw new Error(`TMDB request failed with status ${response.status}`);
    }

    const data = await response.json();
    const filteredByGenre = Boolean(search.trim() && genre);
    const results = filteredByGenre ? filterLocally(data.results ?? [], '', genre) : data.results ?? [];
    return {
      results: sortMovies(results, sort),
      total_pages: data.total_pages ?? 1,
      total_results: filteredByGenre ? results.length : data.total_results ?? results.length,
      isLiveApi: true,
    };
  },
};
