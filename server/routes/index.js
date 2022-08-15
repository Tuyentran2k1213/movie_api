const express = require('express');
const rootRouter = express.Router();

const userMana = require('./userMana/index');
const ticketMana = require('./ticketMana/index');
const theaterMana = require('./theaterMana/index');
const filmMana = require('./filmMana/index');
const tokenMana = require('./tokenMana');


rootRouter.use('/v1', userMana, ticketMana, theaterMana, filmMana, tokenMana);

module.exports = rootRouter;