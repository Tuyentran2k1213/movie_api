const express = require('express');
const filmMana = express.Router();

const film = require('./filmMana');

filmMana.use('/film_mana', film);

module.exports = filmMana;