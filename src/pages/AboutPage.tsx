import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <main className="main-container page-content">
      <h1 className="page-title">About Moview</h1>
      <p className="page-text">
        Moview is a movie browser built with React, TypeScript and React Router. It lists popular
        movies from TMDB, lets you search, filter by genre, sort the results and keep a watchlist.
      </p>
      <p className="page-text">
        Without a TMDB API key the app uses built-in sample movies. Add your key with the API Key
        button on the home page to load live data.
      </p>
      <Link to="/" className="btn-primary">
        Back to movies
      </Link>
    </main>
  );
}
