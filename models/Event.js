const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  date: { type: Date, required: true },
  venue: { type: String, required: true },
  price: { type: Number, required: true },
  seats: { type: Number, required: true },
  seatsAvailable: { type: Number }
}, { timestamps: true });

// Middleware to set initial available seats before saving
eventSchema.pre('save', function(next) {
  if (this.isNew) {
    this.seatsAvailable = this.seats;
  }
  next();
});

module.exports = mongoose.model('Event', eventSchema);