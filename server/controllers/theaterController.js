const Models = require("../models/index");
const response = require("../config/response");

const { Cinema, Cineplex, Cinema_movie, Movie } = Models;
const { errFE, errBE, complete } = response;

//get all the cinema in list
const getAllCinema = async (req, res) => {
  try {
    const allCine = await Cinema.findAll({
      where: { deleted: false },
      include: [{
        model: Cineplex,
        as: "cineplex",
        attributes: {
          exclude: ["deleted"],
        },
      }, {
        model: Cinema_movie,
        as: "cinema_movies",
        include: {
          model: Movie,
          as: 'movie',
          attributes: {
              exclude: ['deleted']}
      },
        attributes: {
          exclude: ['movieId', 'cinemaId', 'deleted']}
      }],
      attributes: {
        exclude: ["deleted", "cineplexId"],
      },
    });
    complete(res, allCine);
  } catch (err) {
    errBE(res, err);
  }
};

// get Cinema with already has id in params
const getDetailCinema = async (req, res) => {
  try {
    const { id } = req.params;

    if (id) {
      const theCine = await Cinema.findOne({
        where: {
          id: Number(id),
          deleted: false,
        },
        include: [{
          model: Cineplex,
          as: "cineplex",
          attributes: {
            exclude: ["deleted"],
          },
        }, {
          model: Cinema_movie,
          as: "cinema_movies",
          include: {
            model: Movie,
            as: 'movie',
            attributes: {
                exclude: ['deleted']}
        },
          attributes: {
            exclude: ['movieId', 'cinemaId', 'deleted']}
        }],
        attributes: {
          exclude: ["deleted", "cineplexId"],
        },
      });

      if (theCine) {
        complete(res, theCine);
      } else {
        errFE(res, null, "the id of Cinema is not exist");
      }
    } else {
      errFE(res, null, "can not get id from the params");
    }
  } catch (err) {
    errBE(res, err);
  }
};

// update Cinema by id in params
const updateCinema = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, cineplexId } = req.body;
    const image = req.file.path;

    const modalMovie = { name, address, cineplexId: Number(cineplexId), image };

    if (name && address && cineplexId && image) {
      const checkCinema = await Cinema.findOne({
        where: {
          id: Number(id),
          deleted: false,
        },
      });

      if (checkCinema) {
        const cinemaResult = await checkCinema.update(modalMovie);
        const { id, name, address, cineplexId, image } = cinemaResult;
        complete(res, { id, name, address, cineplexId, image });
      } else {
        errFE(res, null, "the cinema is not exist");
      }
    } else {
      errFE(res, null, "can not get data");
    }
  } catch (err) {
    errBE(res, err);
  }
};

// delete cinema by id from params
const deleCinema = async (req, res) => {
  try {
    const { id } = req.params;

    if (id) {
      const existCine = await Cinema.findOne({
        where: {
          id: Number(id),
          deleted: false,
        },
      });

      if (existCine) {
        const CineResult = await existCine.update({ deleted: true });
        complete(res, null, "delete Cinema done !!!");
      } else {
        errFE(res, null, "this Cinema is not existing");
      }
    } else {
      errFE(res, null, "can not get data");
    }
  } catch (err) {
    errBE(res, err, "there some error from action !");
  }
};

//create a cinema in cine list
const createCinema = async (req, res) => {
  try {
    const { name, address, cineplexId } = req.body;
    const image = req.file.path;

    const modalCine = { name, address, cineplexId: Number(cineplexId), image };

    if (name && address && cineplexId && image) {
      const checkCine = await Cinema.findOne({ where: { name } });
      if (checkCine) {
        errFE(res, null, "your cinema name has already exist");
      }
      if (!checkCine) {
        const resultCreateCine = await Cinema.create(modalCine);
        complete(res, { id: resultCreateCine.id, ...modalCine });
      }
    } else {
      errFE(res, null, "don't have enough data for Cinema");
    }
  } catch (err) {
    errBE(res, err, "there some error from action !");
  }
};

module.exports = {
  getAllCinema,
  getDetailCinema,
  updateCinema,
  deleCinema,
  createCinema,
};
