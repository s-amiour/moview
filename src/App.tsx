import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <header className="site-header">
          <div className="header-inner">
            <div className="brand-logo">
              <div className="logo-dot"></div>
              <h1 className="logo-text" style={{ fontSize: 'inherit', margin: 0 }}>
                CineGrid
              </h1>
            </div>
            
            <nav className="header-actions">
              <Link to="/" className="btn-icon-label">Home</Link>
              <Link to="/about" className="btn-icon-label">About</Link>
            </nav>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}