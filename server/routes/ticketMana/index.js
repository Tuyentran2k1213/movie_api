const express = require('express');
const ticketMana = express.Router();

const ticket = require('./ticketMana');

ticketMana.use('/ticket_mana', ticket);

module.exports = ticketMana;