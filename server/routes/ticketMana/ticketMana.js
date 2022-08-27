const express = require('express');
const ticket = express.Router();

const middleware = require('../../config/middleware');

const ticketController = require('../../controllers/ticketController');

ticket.get('/getAllTicket', ticketController.getTickets);
ticket.get('/getTicketByid/:id', ticketController.getTicketById);
ticket.put('/updateTicket/:id', ticketController.updateTicket);
ticket.delete('/deleteTicket/:id', middleware.verifyUserToken, ticketController.deleTicket);
ticket.post('/createTicket', middleware.verifyUserToken, ticketController.createTicket);

module.exports = ticket;