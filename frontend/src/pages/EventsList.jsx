import useEvents from '../hooks/useEvents';
import EventCard from '../components/EventCard';

const EventsList = () => {
  const { events, loading, error } = useEvents();

  if (loading) return <p>Loading events...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <section>
      <h2>Upcoming Events</h2>
      <div className="grid">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </section>
  );
};

export default EventsList;
