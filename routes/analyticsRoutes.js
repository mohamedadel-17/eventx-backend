const express = require('express');
const router = express.Router();
const { getDashboardStats, getAttendeeReports } = require('../controllers/analyticsController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// All routes are admin-only
router.use(authMiddleware, roleMiddleware(['Admin']));

router.get('/dashboard', getDashboardStats);
router.get('/attendees', getAttendeeReports);

module.exports = router;