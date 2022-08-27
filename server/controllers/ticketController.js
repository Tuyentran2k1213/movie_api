const Models = require("../models/index");
const response = require("../config/response");

const { Ticket, User, Movie, Cinema, Seat, Cineplex, Showtime, Cinema_movie } = Models;
const { errFE, errBE, complete } = response;

//get all the ticket in list
const getTickets = async (req, res) => {
  try {
    const allTicket = await Ticket.findAll({
      where: { deleted: false },
      attributes: {
        exclude: ["deleted", 'userId', 'seatId'],
      },
      include: [{
        model: User,
        as: 'user',
        attributes: {
            exclude: ["deleted"],
        }},{
        model: Seat,
        as: 'seat',
        attributes: {
            exclude: ["deleted", "showtimeId"],
        },
        include: [{
            model: Showtime,
            as: 'showtime',
            attributes: {
                exclude: ["deleted", "cinemaId"],
            },
            include: [{
                    model: Cinema,
                    as: 'cinema',
                    attributes: {
                        exclude: ["deleted", "cineplexId"],
                    },
                    include: [{
                        model: Cineplex,
                        as: 'cineplex',
                        attributes: {
                            exclude: ["deleted"],
                        }
                    },{
                        model: Cinema_movie,
                        as: 'cinema_movies',
                        attributes: {
                            exclude: ["deleted", "cinemaId", "movieId"],
                        },
                        include: [{
                            model: Movie,
                            as: 'movie',
                            attributes: {
                                exclude: ["deleted"],
                            }
                        }]
                    }]
                  }]
        }]
      }]
    });
    complete(res, allTicket);
  } catch (err) {
    errBE(res, err);
  }
};

// get ticket with already has id in params
const getTicketById = async (req, res) => {
  try {
    const { id } = req.params;

    if (id) {
      const ticket = await Ticket.findOne({
        where: {
          id: Number(id),
          deleted: false,
        },
        attributes: {
          exclude: ["deleted", 'userId', 'seatId'],
        },
        include: [{
            model: User,
            as: 'user',
            attributes: {
                exclude: ["deleted"],
            }},{
            model: Seat,
            as: 'seat',
            attributes: {
                exclude: ["deleted", "showtimeId"],
            },
            include: [{
                model: Showtime,
                as: 'showtime',
                attributes: {
                    exclude: ["deleted", "cinemaId"],
                },
                include: [{
                        model: Cinema,
                        as: 'cinema',
                        attributes: {
                            exclude: ["deleted", "cineplexId"],
                        },
                        include: [{
                            model: Cineplex,
                            as: 'cineplex',
                            attributes: {
                                exclude: ["deleted"],
                            }
                        },{
                            model: Cinema_movie,
                            as: 'cinema_movies',
                            attributes: {
                                exclude: ["deleted", "cinemaId", "movieId"],
                            },
                            include: [{
                                model: Movie,
                                as: 'movie',
                                attributes: {
                                    exclude: ["deleted"],
                                }
                            }]
                        }]
                      }]
            }]
          }]
      });

      if (ticket) {
        complete(res, ticket);
      } else {
        errFE(res, null, "the id of the ticket is not exist");
      }
    } else {
      errFE(res, null, "can not get id from the params");
    }
  } catch (err) {
    errBE(res, err);
  }
};

// update ticket by id im params
const updateTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, seatId } = req.body;

    const modalTicket = { userId, seatId };

    if (userId && seatId) {
      const checkTicket = await Ticket.findOne({
        where: {
          id: Number(id),
          deleted: false,
        },
      });

      if (checkTicket) {
        const ticketResult = await checkTicket.update(modalTicket);
        const { id, userId, seatId } = ticketResult;
        complete(res, { id, userId, seatId });
      } else {
        errFE(res, null, "your ticket id does not exist");
      }
    } else {
      errFE(res, null, "can not get data");
    }
  } catch (err) {
    errBE(res, err);
  }
};

// delete ticket by id from params
const deleTicket = async (req, res) => {
  try {
    const { id } = req.params;

    if (id) {
      const checkTicket = await Ticket.findOne({
        where: {
          id: Number(id),
          deleted: false,
        },
      });

      if (checkTicket) {
        const result = await checkTicket.update({ deleted: true });
        complete(res, null, "delete done !!!");
      } else {
        errFE(res, null, "this ticket id is not existing");
      }
    } else {
      errFE(res, null, "can not get data");
    }
  } catch (err) {
    errBE(res, err, "there some error from action !");
  }
};

//create a seat
const createTicket = async (req, res) => {
  try {
    const { userId, seatId } = req.body;
    const modalTicket = { userId, seatId };
    if (userId && seatId) {
      const checkTicket = await Ticket.findOne({ where: { ...modalTicket } });
      if (checkTicket) {
        errFE(res, null, "your ticket has already exist");
      }
      if (!checkTicket) {
        const resultCreate = await Ticket.create(modalTicket);
        complete(res, { id: resultCreate.id, ...modalTicket });
      }
    } else {
      errFE(res, null, "don't have enough data !!!");
    }
  } catch (err) {
    errBE(res, err, "there some error from action !");
  }
};

module.exports = {
  getTickets,
  getTicketById,
  updateTicket,
  deleTicket,
  createTicket,
};
