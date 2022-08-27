const express = require('express');
const theater = express.Router();

const theaterController = require('../../controllers/theaterController');
const middleware = require('../../config/middleware');

theater.get('/getAllCinema', theaterController.getAllCinema);
theater.get('/getCinemaByid/:id', theaterController.getDetailCinema);
theater.put('/updateCinema/:id', middleware.upLoadImage.single('image'), theaterController.updateCinema);
theater.delete('/deleteCinema/:id', middleware.verifyUserToken, theaterController.deleCinema);
theater.post('/createCinema', middleware.verifyUserToken, middleware.upLoadImage.single('image'), theaterController.createCinema);

module.exports = theater;