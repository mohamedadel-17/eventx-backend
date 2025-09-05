const express = require('express');
const router = express.Router();
const { createEvent, getEvents, getEventById, updateEvent, deleteEvent } = require('../controllers/eventController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// Admin routes
router.post('/', authMiddleware, roleMiddleware(['Admin']), createEvent);
router.put('/:id', authMiddleware, roleMiddleware(['Admin']), updateEvent);
router.delete('/:id', authMiddleware, roleMiddleware(['Admin']), deleteEvent);

// Public routes
router.get('/', getEvents);
router.get('/:id', getEventById);

module.exports = router;