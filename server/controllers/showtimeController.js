const Models = require("../models/index");
const response = require("../config/response");

const { Showtime, Cinema, Cineplex, Cinema_movie, Movie } = Models;
const { errFE, errBE, complete } = response;

//get all the showtime list
const getShowtime = async (req, res) => {
  try {
    const allShowtimes = await Showtime.findAll({
      where: { deleted: false },
      attributes: {
        exclude: ["deleted","cinemaId"],
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
    });
    complete(res, allShowtimes);
  } catch (err) {
    errBE(res, err);
  }
};

// showtime with already has id in params
const getShowtimeById = async (req, res) => {
  try {
    const { id } = req.params;

    if (id) {
      const showtime = await Showtime.findOne({
        where: {
          id: Number(id),
          deleted: false,
        },
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
      });

      if (showtime) {
        complete(res, showtime);
      } else {
        errFE(res, null, "the id of showtime is not exist");
      }
    } else {
      errFE(res, null, "can not get id from the params");
    }
  } catch (err) {
    errBE(res, err);
  }
};

// update showtime by id im params
const updateShowtime = async (req, res) => {
  try {
    const { id } = req.params;
    const { startTime, cinemaId } = req.body;

    const modalShowtime = { startTime, cinemaId: Number(cinemaId) };

    if (id && startTime && cinemaId) {
      const checkShowtime = await Showtime.findOne({
        where: {
          id: Number(id),
          deleted: false,
        },
      });

      if (checkShowtime) {
        const showtimeResult = await checkShowtime.update(modalShowtime);
        const { id, startTime, cinemaId } = showtimeResult;
        complete(res, { id, startTime, cinemaId });
      } else {
        errFE(res, null, "showtime id does not exist");
      }
    } else {
      errFE(res, null, "can not get data");
    }
  } catch (err) {
    errBE(res, err);
  }
};

// delete showtime by id from params
const deleShowtime = async (req, res) => {
  try {
    const { id } = req.params;

    if (id) {
      const checkShowtime = await Showtime.findOne({
        where: {
          id: Number(id),
          deleted: false,
        },
      });

      if (checkShowtime) {
        const result = await checkShowtime.update({ deleted: true });
        complete(res, null, "delete done !!!");
      } else {
        errFE(res, null, "this showtime id is not existing");
      }
    } else {
      errFE(res, null, "can not get data");
    }
  } catch (err) {
    errBE(res, err, "there some error from action !");
  }
};

//create a showtime
const createShowtime = async (req, res) => {
  try {
    const { startTime, cinemaId } = req.body;
    const modalShowtime = { startTime, cinemaId };
    if (startTime && cinemaId) {
      const checkShowtime = await Showtime.findOne({
        where: { startTime, cinemaId },
      });
      if (checkShowtime) {
        errFE(res, null, "your showtime has already exist");
      }
      if (!checkShowtime) {
        const resultCreate = await Showtime.create(modalShowtime);
        complete(res, { id: resultCreate.id, ...modalShowtime });
      }
    } else {
      errFE(res, null, "don't have enough ");
    }
  } catch (err) {
    errBE(res, err, "there some error from action !");
  }
};

module.exports = {
  getShowtime,
  getShowtimeById,
  updateShowtime,
  deleShowtime,
  createShowtime,
};
