import { useEffect, useState } from 'react';
import { getEventById } from '../services/eventService';

const useEvent = (id) => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      try {
        const data = await getEventById(id);
        setEvent(data);
      } catch (err) {
        setError(err?.response?.data?.message || 'Failed to load event');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  return { event, loading, error };
};

export default useEvent;
