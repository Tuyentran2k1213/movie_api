const express = require('express');
const rootRouter = express.Router();

const userMana = require('./userMana/index');
const ticketMana = require('./ticketMana/index');
const theaterMana = require('./theaterMana/index');
const filmMana = require('./filmMana/index');
const authMana = require('./authMana/index');
const tokenMana = require('./tokenMana');
const cineplexMana = require('./cineplexMana/index');

const middleware = require('../config/middleware');
const { verifyToken } = middleware;


rootRouter.use('/v1', verifyToken, userMana, ticketMana, theaterMana, filmMana, authMana, tokenMana, cineplexMana);

module.exports = rootRouter;