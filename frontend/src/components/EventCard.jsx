import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  return (
    <div className="card">
      {event.imageUrl && (
        <img className="card-img" src={event.imageUrl} alt={event.title} />
      )}
      <div className="card-body">
        <h3>{event.title}</h3>
        <p className="muted">{new Date(event.startDate).toLocaleString()}</p>
        <p>{event.location}</p>
        <Link to={`/events/${event._id}`} className="btn">View Details</Link>
      </div>
    </div>
  );
};

export default EventCard;
