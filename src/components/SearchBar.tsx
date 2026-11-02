type SearchBarProps = {
  query: string;
  onChange: (query: string) => void;
};

export default function SearchBar({ query, onChange }: SearchBarProps) {
  return (
    <div className="header-search">
      <div className="search-input-wrapper">
        <input
          type="text"
          className="search-input"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}