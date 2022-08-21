const express = require('express');
const film = express.Router();

const middleware = require('../../config/middleware');

const filmController = require('../../controllers/filmController');

film.get('/getAllMovies', filmController.getAllFilm);
film.get('/getDetailMovie/:id', filmController.getDetailFilm);
film.put('/updateMovie/:id', middleware.upLoadImage.fields([{ name: "images", maxCount: 10 }, { name: "poster" }]),filmController.updateFilm);
film.delete('/deleteMovie/:id', filmController.deleFilm);
film.post('/createMovie', middleware.upLoadImage.fields([{ name: "images", maxCount: 10 }, { name: "poster" }]), filmController.createMovie);

module.exports = film;
