const express = require('express');
const seat = express.Router();

const middleware = require('../../config/middleware');

const seatController = require('../../controllers/seatController');

seat.get('/getAllSeat', seatController.getSeats);
seat.get('/getSeatByid/:id', seatController.getSeatById);
seat.put('/updateSeat/:id', seatController.updateSeat);
seat.delete('/deleteSeat/:id', middleware.verifyUserToken, seatController.deleSeat);
seat.post('/createSeat', middleware.verifyUserToken, seatController.createSeat);

module.exports = seat;