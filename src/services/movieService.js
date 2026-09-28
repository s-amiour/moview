import { SAMPLE_MOVIES } from '../data/sampleMovies';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const movieService = {
  async fetchMovies({ search = '', genre, sort, onlyFavorites, page = 1 } = {}, signal) {
    if (!API_KEY) {
      let results = [...SAMPLE_MOVIES];

      if (search) {
        const query = search.toLowerCase();
        results = results.filter((m) => m.title.toLowerCase().includes(query));
      }

      return {
        results,
        total_pages: 1,
        total_results: results.length,
        isLiveApi: false,
      };
    }

    const endpoint = search ? '/search/movie' : '/movie/popular';
    const url = new URL(`${BASE_URL}${endpoint}`);

    if (search) {
      url.searchParams.append('query', search);
    }
    
    url.searchParams.append('page', page.toString());

    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        accept: 'application/json',
      },
      signal,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch movies. Status: ${response.status}`);
    }

    const data = await response.json();

    return {
      results: data.results,
      total_pages: data.total_pages,
      total_results: data.total_results,
      isLiveApi: true,
    };
  },
};