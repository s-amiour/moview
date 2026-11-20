import { SAMPLE_MOVIES } from '../data/sampleMovies';

const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL || 'https://api.themoviedb.org/3';
const PLACEHOLDER_KEY = 'your_api_key_here';

function getEnvApiKey() {
  const key = (import.meta.env.VITE_TMDB_API_KEY ?? '').trim();
  return key === PLACEHOLDER_KEY ? '' : key;
}

function fetchSampleMovies(search) {
  const query = search.trim().toLowerCase();
  const results = query
    ? SAMPLE_MOVIES.filter((movie) => movie.title.toLowerCase().includes(query))
    : SAMPLE_MOVIES;

  return {
    results,
    total_pages: 1,
    total_results: results.length,
    isLiveApi: false,
  };
}

async function fetchTmdbMovies({ apiKey, search, page, signal }) {
  const query = search.trim();
  const url = new URL(`${BASE_URL}${query ? '/search/movie' : '/movie/popular'}`);
  if (query) url.searchParams.set('query', query);
  url.searchParams.set('page', String(page));

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      accept: 'application/json',
    },
    signal,
  });

  if (!response.ok) {
    throw new Error(`TMDB request failed with status ${response.status}`);
  }

  const data = await response.json();
  return {
    results: data.results ?? [],
    total_pages: data.total_pages ?? 1,
    total_results: data.total_results ?? 0,
    isLiveApi: true,
  };
}

export const movieService = {
  async fetchMovies(
    { search = '', genre = '', sort = 'popularity', onlyFavorites = false, page = 1 } = {},
    { signal } = {},
  ) {
    const apiKey = getEnvApiKey();
    if (!apiKey) return fetchSampleMovies(search);
    return fetchTmdbMovies({ apiKey, search, page, signal });
  },
};
