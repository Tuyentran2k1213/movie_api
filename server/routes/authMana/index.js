const express = require('express');
const registerMana = express.Router();

const registerUser = require('./authMana');

registerMana.use('/userAuth', registerUser);

module.exports = registerMana;