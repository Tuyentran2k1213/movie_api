const express = require('express');
const filmMana = express.Router();

const film = require('./filmMana');

filmMana.use('/movie_mana', film);

module.exports = filmMana;