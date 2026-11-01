export interface Genre {
    id: number;
    name: string
}

export interface Movie {
    id: number;
    title: string;
    original_title?: string;
    overview?: string;
    poster_path?: string | null;
    backdrop_path?: string | null;
    genre_ids: number[];
    release_date?: string;
    vote_average?: number;
    vote_count?: number;
    popularity?: number; 
    adult?: boolean;
    original_language?: string;
    video?: boolean
}

type SortOption = 'popularity' | 'rating' | 'release_date' | 'title';
type ViewMode = 'grid' | 'list';
type Theme = 'dark' | 'light';

