const express = require('express');
const ticket = express.Router();

const ticketController = require('../../controllers/ticketController');

ticket.get('/getAllTickets', ticketController.getAllTicket);

module.exports = ticket;