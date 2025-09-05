const mongoose = require('mongoose');
const ticketSchema = new mongoose.Schema({
event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
qrCode: { type: String, required: true }, // URL to the generated QR code image
}, { timestamps: true });
module.exports = mongoose.model('Ticket', ticketSchema);