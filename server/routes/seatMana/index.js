const express = require('express');
const seatMana = express.Router();

const seat = require('./seatMana');

seatMana.use('/seat_mana', seat);

module.exports = seatMana;