const Ticket = require("../models/Ticket");
const Event = require("../models/Event");
const qrcode = require("qrcode");

// User: Book a ticket
exports.bookTicket = async (req, res) => {
  const { eventId } = req.body;
  const userId = req.user.id;
  console.log("console log eventId:", eventId);

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }
    if (event.seatsAvailable <= 0) {
      return res
        .status(400)
        .json({ message: "Sorry, this event is sold out." });
    }

    // Create the ticket
    const ticket = new Ticket({ event: eventId, user: userId, qrCode: "" });

    // Generate QR code with ticket details
    const qrCodeData = JSON.stringify({
      ticketId: ticket._id,
      eventId: event.id,
      userId: userId,
      eventTitle: event.title,
    });
    const qrCodeImage = await qrcode.toDataURL(qrCodeData);

    ticket.qrCode = qrCodeImage;
    await ticket.save();

    // Decrement available seats
    event.seatsAvailable -= 1;
    await event.save();

    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// User: View their tickets
exports.getMyTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ user: req.user.id }).populate("event");
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// User: remove their tickets
exports.removeMyTickets = async (req, res) => {
  try {
    await Ticket.findByIdAndDelete({
      _id: req.param.id,
      user: req.user.id,
    });
    res.json({ message: "Ticket deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
