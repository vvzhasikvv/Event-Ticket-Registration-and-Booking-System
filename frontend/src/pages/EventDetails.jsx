import { useParams, Link } from 'react-router-dom';
import useEvent from '../hooks/useEvent';

const EventDetails = () => {
  const { id } = useParams();
  const { event, loading, error } = useEvent(id);

  if (loading) return <p>Loading event...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!event) return <p>Event not found.</p>;

  return (
    <section className="details">
      {event.imageUrl && (
        <img className="details-img" src={event.imageUrl} alt={event.title} />
      )}
      <div>
        <h2>{event.title}</h2>
        <p className="muted">{new Date(event.startDate).toLocaleString()}</p>
        <p>{event.description}</p>
        <p><strong>Location:</strong> {event.location}</p>
        <p><strong>Price:</strong> ${event.price}</p>
        <p><strong>Available Seats:</strong> {event.availableSeats}</p>
        <Link to="/events" className="btn ghost">Back to Events</Link>
      </div>
    </section>
  );
};

export default EventDetails;
