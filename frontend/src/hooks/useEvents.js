import { useEffect, useState } from 'react';
import { getEvents } from '../services/eventService';

const useEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (err) {
        setError(err?.response?.data?.message || 'Failed to load events');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return { events, loading, error };
};

export default useEvents;
