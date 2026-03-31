import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <section className="hero">
      <div>
        <h1>Find and book your next event</h1>
        <p className="muted">Browse curated events and secure your tickets in minutes.</p>
        <div className="hero-actions">
          <Link to="/events" className="btn">Browse Events</Link>
          <Link to="/register" className="btn ghost">Create Account</Link>
        </div>
      </div>
    </section>
  );
};

export default Home;
