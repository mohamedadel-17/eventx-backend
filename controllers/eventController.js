const Event = require("../models/Event");

// Admin: Create a new event
exports.createEvent = async (req, res) => {
  const { title, date, venue, price, seats } = req.body;
  console.log(title, date, venue, price, seats);
  try {
    const event = new Event({ title, date, venue, price, seats });
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// All users: Get all events
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// All users: Get a single event by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Admin: Update an event
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Admin: Delete an event
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json({ message: "Event deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
