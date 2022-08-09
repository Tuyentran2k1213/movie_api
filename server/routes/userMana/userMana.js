const express = require('express');
const user = express.Router();

const userController = require('../../controllers/userController');

user.get('/getAllUsers', userController.getAllUsers);

module.exports = user;