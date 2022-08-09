const express = require('express');
const theater = express.Router();

const theaterController = require('../../controllers/theaterController');

theater.get('/getAllTheaters', theaterController.getAllTheater);

module.exports = theater;