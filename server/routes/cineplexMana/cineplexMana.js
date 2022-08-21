const express = require('express');
const cineplex = express.Router();

const middleware = require('../../config/middleware');

const cineplexController = require('../../controllers/cineplexController');

cineplex.get('/getallCineplex', cineplexController.getAllCineplex);
cineplex.get('/getCineplexById/:id', cineplexController.getCineplexId);
cineplex.put('/updateCineplex/:id', middleware.upLoadImage.single("logo"),cineplexController.updateCineplex);
cineplex.delete('/deleteCineplex/:id', cineplexController.deleCineplex);
cineplex.post('/createCineplex', middleware.upLoadImage.single("logo"),cineplexController.createCineplex);

module.exports = cineplex;
