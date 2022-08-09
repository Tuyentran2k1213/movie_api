const express = require('express');
const film = express.Router();

const filmController = require('../../controllers/filmController');

film.get('/getAllFilms', filmController.getAllFilm);

module.exports = film;
