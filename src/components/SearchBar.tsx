import { Search, X } from 'lucide-react';

type SearchBarProps = {
  query: string;
  onChange: (query: string) => void;
};

export default function SearchBar({ query, onChange }: SearchBarProps) {
  return (
    <div className="header-search">
      <div className="search-input-wrapper">
        <Search className="search-icon" aria-hidden="true" />
        <input
          type="text"
          className="search-input"
          placeholder="Search movies..."
          aria-label="Search movies"
          value={query}
          onChange={(e) => onChange(e.target.value)}
        />
        <button type="button" className="search-clear-btn" aria-label="Clear search" onClick={() => onChange('')}>
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
