const express = require('express');
const token = express.Router();

const tokenController = require('../../controllers/tokenController');

token.get('/get_new_accessToken', tokenController.getNewToken);
token.get('/get_existing_accessToken', tokenController.getToken);

module.exports = token;