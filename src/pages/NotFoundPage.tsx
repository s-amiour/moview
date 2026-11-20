import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <main className="main-container page-content">
      <p className="page-code">404</p>
      <h1 className="page-title">Page not found</h1>
      <p className="page-text">The page you are looking for does not exist.</p>
      <button type="button" className="btn-primary" onClick={() => navigate('/')}>
        Back to Home
      </button>
    </main>
  );
}
