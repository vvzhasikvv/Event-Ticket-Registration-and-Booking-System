const Booking = require('../models/Booking');
const Event = require('../models/Event');

const createBooking = async (req, res) => {
  try {
    const { eventId, quantity } = req.body;
    if (!eventId || !quantity) {
      return res.status(400).json({ message: 'Event and quantity are required' });
    }

    const existing = await Booking.findOne({ user: req.user._id, event: eventId });
    if (existing) {
      return res.status(409).json({ message: 'Duplicate booking not allowed' });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.availableSeats < quantity) {
      return res.status(400).json({ message: 'Not enough seats available' });
    }

    event.availableSeats -= quantity;
    await event.save();

    const totalPrice = quantity * event.price;
    const booking = await Booking.create({
      user: req.user._id,
      event: event._id,
      quantity,
      totalPrice,
      status: 'confirmed'
    });

    return res.status(201).json(booking);
  } catch (err) {
    return res.status(500).json({ message: 'Failed to create booking' });
  }
};

const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate('event');
    return res.json(bookings);
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch bookings' });
  }
};

const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, user: req.user._id }).populate('event');
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    return res.json(booking);
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch booking' });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, user: req.user._id });
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.status === 'cancelled') {
      return res.status(400).json({ message: 'Booking already cancelled' });
    }

    const event = await Event.findById(booking.event);
    if (event) {
      event.availableSeats += booking.quantity;
      await event.save();
    }

    booking.status = 'cancelled';
    await booking.save();

    return res.json({ message: 'Booking cancelled' });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to cancel booking' });
  }
};

module.exports = { createBooking, getBookings, getBookingById, cancelBooking };
