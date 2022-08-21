const express = require('express');
const cineplex = express.Router();

const cineplexController = require('../../controllers/cineplexController');

cineplex.get('/getallCineplex', cineplexController.getAllCineplex);
cineplex.get('/getCineplexById/:id', cineplexController.getCineplexId);
cineplex.put('/updateCineplex/:id', cineplexController.updateCineplex);
cineplex.delete('/deleteCineplex/:id', cineplexController.deleCineplex);
cineplex.post('/createCineplex', cineplexController.createCineplex);

module.exports = cineplex;
