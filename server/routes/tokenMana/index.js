const express = require('express');
const tokenMana = express.Router();

const token = require('./tokenMana');

tokenMana.use('/access_token', token);

module.exports = tokenMana;