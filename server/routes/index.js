const express = require('express');
const rootRouter = express.Router();

const userMana = require('./userMana/index');
const ticketMana = require('./ticketMana/index');
const theaterMana = require('./theaterMana/index');
const filmMana = require('./filmMana/index');
const authMana = require('./authMana/index');
const tokenMana = require('./tokenMana');
const cineplexMana = require('./cineplexMana/index');
const seatMana = require('./seatMana/index');
const showtimeMana = require('./showtimeMana/index');

const middleware = require('../config/middleware');
const { verifyToken } = middleware;


rootRouter.use('/v1', tokenMana, verifyToken, authMana, middleware.checkUsertoken, userMana, ticketMana, theaterMana, filmMana, cineplexMana, seatMana, showtimeMana);

module.exports = rootRouter;