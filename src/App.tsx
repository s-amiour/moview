import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { getTheme, setTheme } from './utils/storage';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  useEffect(() => {
    setTheme(getTheme());
  }, []);

  return (
    <BrowserRouter>
      <div className="app-layout">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
