const Event = require('../models/Event');
const Ticket = require('../models/Ticket');
const User = require('../models/User');

// Admin: Get dashboard stats
exports.getDashboardStats = async (req, res) => {
  try {
    const totalEvents = await Event.countDocuments();
    const ticketsSold = await Ticket.countDocuments();
    
    const revenueData = await Ticket.aggregate([
      {
        $lookup: {
          from: 'events',
          localField: 'event',
          foreignField: '_id',
          as: 'eventDetails'
        }
      },
      { $unwind: '$eventDetails' },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$eventDetails.price' }
        }
      }
    ]);
    const totalRevenue = revenueData.length > 0 ? revenueData[0].totalRevenue : 0;

    res.json({ totalEvents, ticketsSold, totalRevenue });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Admin: Get attendee demographics
exports.getAttendeeReports = async (req, res) => {
  try {
    const tickets = await Ticket.find().populate('user');
    
    // Process data to generate reports (this can be expanded)
    const genderData = {};
    const ageGroups = {
      '18-25': 0,
      '26-35': 0,
      '36-50': 0,
      '50+': 0,
      'Unknown': 0
    };

    tickets.forEach(ticket => {
      if (ticket.user) {
        // Gender
        const gender = ticket.user.gender || 'Unknown';
        genderData[gender] = (genderData[gender] || 0) + 1;

        // Age
        const age = ticket.user.age;
        if (age >= 18 && age <= 25) ageGroups['18-25']++;
        else if (age >= 26 && age <= 35) ageGroups['26-35']++;
        else if (age >= 36 && age <= 50) ageGroups['36-50']++;
        else if (age > 50) ageGroups['50+']++;
        else ageGroups['Unknown']++;
      }
    });

    res.json({ genderData, ageGroups });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};