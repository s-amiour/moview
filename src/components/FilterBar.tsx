import { LayoutGrid, List } from 'lucide-react';
import { GENRES } from '../data/genres';
import type { SortOption, ViewMode } from '../types';

type FilterBarProps = {
  genre: string;
  onGenreChange: (genre: string) => void;
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
  viewMode: ViewMode;
  onViewModeChange: (viewMode: ViewMode) => void;
};

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'popularity', label: 'Most Popular' },
  { value: 'vote_average', label: 'Top Rated' },
  { value: 'release_date', label: 'Newest First' },
  { value: 'title', label: 'Title (A-Z)' },
];

export default function FilterBar({
  genre,
  onGenreChange,
  sort,
  onSortChange,
  viewMode,
  onViewModeChange,
}: FilterBarProps) {
  const pills = [
    { id: '', name: 'All' },
    ...Object.entries(GENRES)
      .map(([id, name]) => ({ id, name }))
      .sort((a, b) => a.name.localeCompare(b.name)),
  ];

  return (
    <div className="filter-bar">
      <div className="genre-pills-scroll">
        {pills.map((pill) => (
          <button
            key={pill.id || 'all'}
            type="button"
            className={`genre-pill${genre === pill.id ? ' active' : ''}`}
            aria-pressed={genre === pill.id}
            onClick={() => onGenreChange(pill.id)}
          >
            {pill.name}
          </button>
        ))}
      </div>

      <div className="filter-actions-right">
        <div className="sort-select-wrapper">
          <select
            className="sort-select"
            aria-label="Sort movies by"
            value={sort}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="view-toggle-group">
          <button
            type="button"
            className={`view-btn${viewMode === 'grid' ? ' active' : ''}`}
            aria-label="Grid view"
            aria-pressed={viewMode === 'grid'}
            onClick={() => onViewModeChange('grid')}
          >
            <LayoutGrid size={16} />
          </button>
          <button
            type="button"
            className={`view-btn${viewMode === 'list' ? ' active' : ''}`}
            aria-label="List view"
            aria-pressed={viewMode === 'list'}
            onClick={() => onViewModeChange('list')}
          >
            <List size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
