const express = require("express");
const router = express.Router();
const { bookTicket, getMyTickets } = require("../controllers/ticketController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/book", authMiddleware, bookTicket);
router.get("/my-tickets", authMiddleware, getMyTickets);
router.delete("/deleteTicket/:id", authMiddleware, getMyTickets);

module.exports = router;
