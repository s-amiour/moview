import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <header className="site-header">
      <nav className="header-inner">
        <div id="brand-logo" className="brand-logo" aria-label="Home" title="Home">
          <div className="logo-dot"></div>
          <h1 className="logo-text" style={{ fontSize: 'inherit', margin: 0 }}>
            Moview
          </h1>
        </div>

        <div className="header-search">
          <div className="search-input-wrapper">
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input type="text" id="search-input" className="search-input" placeholder="Search movies..." autoComplete="off" />
          </div>
        </div>
        
        <div className="header-actions">
          <button id="fav-toggle-btn" className="btn-icon-label ">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <span>Watchlist</span>
            {/* Process that counts fav movies */}
            <span id="fav-count-badge" className="count-badge">5</span>
          </button>
          <Link to="/about" className="btn-icon-label">About</Link>
        </div>
      </nav>
    </header>
  );
}