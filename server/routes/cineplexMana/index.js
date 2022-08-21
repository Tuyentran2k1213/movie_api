const express = require('express');
const cineplexMana = express.Router();

const cineplex = require('./cineplexMana');

cineplexMana.use('/cineplexMana', cineplex);

module.exports = cineplexMana;