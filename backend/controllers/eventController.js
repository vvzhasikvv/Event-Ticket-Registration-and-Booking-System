const Event = require('../models/Event');

const createEvent = async (req, res) => {
  try {
    const { title, description, location, startDate, endDate, capacity, price, imageUrl } = req.body;
    if (!title || !description || !location || !startDate || !endDate || !capacity || price === undefined) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const event = await Event.create({
      title,
      description,
      location,
      startDate,
      endDate,
      capacity,
      availableSeats: capacity,
      price,
      imageUrl,
      createdBy: req.user._id
    });

    return res.status(201).json(event);
  } catch (err) {
    return res.status(500).json({ message: 'Failed to create event' });
  }
};

const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ startDate: 1 });
    return res.json(events);
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch events' });
  }
};

const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    return res.json(event);
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch event' });
  }
};

const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const updates = req.body;
    if (updates.capacity !== undefined) {
      if (updates.capacity < event.capacity - event.availableSeats) {
        return res.status(400).json({ message: 'Capacity cannot be less than booked seats' });
      }
      const booked = event.capacity - event.availableSeats;
      updates.availableSeats = updates.capacity - booked;
    }

    const updated = await Event.findByIdAndUpdate(req.params.id, updates, { new: true });
    return res.json(updated);
  } catch (err) {
    return res.status(500).json({ message: 'Failed to update event' });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    await event.deleteOne();
    return res.json({ message: 'Event deleted' });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to delete event' });
  }
};

module.exports = { createEvent, getEvents, getEventById, updateEvent, deleteEvent };
