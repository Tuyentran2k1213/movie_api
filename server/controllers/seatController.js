const Models = require("../models/index");
const response = require("../config/response");

const { Seat, Showtime, Cinema, Cineplex, Cinema_movie, Movie } = Models;
const { errFE, errBE, complete } = response;

//get all the seat in list
const getSeats = async (req, res) => {
  try {
    const allSeat = await Seat.findAll({
      where: { deleted: false },
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
      });
    complete(res, allSeat);
  } catch (err) {
    errBE(res, err);
  }
};

// seat with already has id in params
const getSeatById = async (req, res) => {
  try {
    const { id } = req.params;

    if (id) {
      const seat = await Seat.findOne({
        where: {
          id: Number(id),
          deleted: false,
        },
        attributes: {
          exclude: ["deleted"],
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
      });

      if (seat) {
        complete(res, seat);
      } else {
        errFE(res, null, "the id of the seat is not exist");
      }
    } else {
      errFE(res, null, "can not get id from the params");
    }
  } catch (err) {
    errBE(res, err);
  }
};

// update showtime by id im params
const updateSeat = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, status, price, type, showtimeId } = req.body;

    const modalSeat = {
      name,
      status,
      price,
      type,
      showtimeId: Number(showtimeId),
    };

    if (id && name && status && price && type && showtimeId) {
      const checkSeat = await Seat.findOne({
        where: {
          id: Number(id),
          deleted: false,
        },
      });

      if (checkSeat) {
        const seatResult = await checkSeat.update(modalSeat);
        const { id, name, status, price, type, showtimeId } = seatResult;
        complete(res, { id, name, status, price, type, showtimeId });
      } else {
        errFE(res, null, "seat id does not exist");
      }
    } else {
      errFE(res, null, "can not get data");
    }
  } catch (err) {
    errBE(res, err);
  }
};

// delete seat by id from params
const deleSeat = async (req, res) => {
  try {
    const { id } = req.params;

    if (id) {
      const checkSeat = await Seat.findOne({
        where: {
          id: Number(id),
          deleted: false,
        },
      });

      if (checkSeat) {
        const result = await checkSeat.update({ deleted: true });
        complete(res, null, "delete done !!!");
      } else {
        errFE(res, null, "this seat id is not existing");
      }
    } else {
      errFE(res, null, "can not get data");
    }
  } catch (err) {
    errBE(res, err, "there some error from action !");
  }
};

//create a seat
const createSeat = async (req, res) => {
  try {
    const { name, status, price, type, showtimeId } = req.body;
    const modalSeat = {
      name,
      status,
      price,
      type,
      showtimeId: Number(showtimeId),
    };
    if (name && price && type && showtimeId) {
      const checkSeat = await Seat.findOne({ where: { name } });
      if (checkSeat) {
        errFE(res, null, "your seat has already exist");
      }
      if (!checkSeat) {
        const resultCreate = await Seat.create(modalSeat);
        complete(res, { id: resultCreate.id, ...modalSeat });
      }
    } else {
      errFE(res, null, "don't have enough data !!!");
    }
  } catch (err) {
    errBE(res, err, "there some error from action !");
  }
};

module.exports = {
  getSeats,
  getSeatById,
  updateSeat,
  deleSeat,
  createSeat,
};
