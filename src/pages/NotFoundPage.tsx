import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <main className="main-container empty-state" style={{ paddingTop: '100px' }}>
      <div className="empty-icon">404</div>
      <h1>Page Not Found</h1>
      <p className="empty-text">The URL you requested does not exist or has been moved.</p>
      <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
        <Link to="/" className="btn-primary">
          Return to Home
        </Link>
        <button className="btn-secondary" onClick={() => window.history.back()}>
          Go Back
        </button>
      </div>
    </main>
  );
}