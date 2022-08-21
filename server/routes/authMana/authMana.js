const express = require('express');
const authUser = express.Router();

const userAuth = require('../../controllers/authController');

authUser.post('/login', userAuth.userLogin);

authUser.post('/register', userAuth.userRegist);

module.exports = authUser;