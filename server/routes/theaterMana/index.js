const express = require('express');
const theaterMana = express.Router();

const theater = require('./theaterMana');

theaterMana.use('/theater_mana', theater);

module.exports = theaterMana;