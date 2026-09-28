import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <main className="main-container" style={{ padding: '60px 24px', textAlign: 'center' }}>
      <h1>About CineGrid</h1>
      <p style={{ marginTop: '16px', color: 'var(--text-muted)' }}>
        Discover, track, and manage your favorite movies across the cinematic universe.
      </p>
      <div style={{ marginTop: '32px' }}>
        <Link to="/" className="btn-primary">
          Back to Movies
        </Link>
      </div>
    </main>
  );
}