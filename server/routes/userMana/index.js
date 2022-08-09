const express = require('express');
const userMana = express.Router();

const user = require('./userMana');

userMana.use('/user_mana', user);

module.exports = userMana;