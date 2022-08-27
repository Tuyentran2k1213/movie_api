const express = require('express');
const showtimeMana = express.Router();

const showtime = require('./showtimeMana');

showtimeMana.use('/showtime_mana', showtime);

module.exports = showtimeMana;