const express = require('express');
const showtime = express.Router();

const middleware = require('../../config/middleware');

const showtimeController = require('../../controllers/showtimeController');

showtime.get('/getAllshowtime', showtimeController.getShowtime);
showtime.get('/getShowtimeByid/:id', showtimeController.getShowtimeById);
showtime.put('/updateShowtime/:id', showtimeController.updateShowtime);
showtime.delete('/deleteShowtime/:id', middleware.verifyUserToken, showtimeController.deleShowtime);
showtime.post('/createShowtime', middleware.verifyUserToken, showtimeController.createShowtime);

module.exports = showtime;