const Models = require('../models/index');
const response = require('../config/response');

const { Movie, Cinema_movie, Cinema } = Models;
const { errFE, errBE, complete } = response;

//get all the movie in list
const getAllFilm = async (req, res) => {
    try{
        const allMovie = await Movie.findAll({ where: { deleted: false }, include: {
            model: Cinema_movie,
            as: 'cinema_movies',
            include: {
                model: Cinema,
                as: 'cinema',
                attributes: {
                    exclude: ['deleted']}
            },
            attributes: {
                exclude: ['movieId', 'deleted', 'cinemaId']}
        }, attributes: {
            exclude: ['deleted']} });
        complete(res, allMovie);
    } catch(err) {
        errBE(res, err);
    }
}

// get film with already has id in params
const getDetailFilm = async (req, res) => {

    try{
        const { id } = req.params;
        
        if(id){
            const theMovie = await Movie.findOne({ where: {
                id: Number(id),
                deleted: false
            }, include: {
                model: Cinema_movie,
                as: 'cinema_movies',
                include: {
                    model: Cinema,
                    as: 'cinema',
                    attributes: {
                        exclude: ['deleted']}
                },
                attributes: {
                    exclude: ['movieId', 'deleted', 'cinemaId']}
            }, attributes: {
                exclude: ['deleted']}});

            if(theMovie){
                complete(res, theMovie);
            } else {
                errFE(res, null, 'the id of movie is not exist')
            }

        }else {
            errFE(res, null, "can not get id from the params")
        }

    } catch(err) {
        errBE(res, err);
    }
    
}

// update movie by id in params
const updateFilm = async (req, res) => {    
    try{
        const { id } = req.params;
        const { name, startDate, time, evaluate, description, trailer } = req.body;
        const poster = req.files['poster'][0].path;
        const images = JSON.stringify(req.files['images']?.map((image, index) => image.path));

        const modalMovie = { name, startDate, time, evaluate, description, poster, trailer, images};
        
        if(name && startDate && time && evaluate && description && poster && trailer && images){

            const checkMovie = await Movie.findOne({ where: {
                id: Number(id),
                deleted: false
            }});

            if(checkMovie){
                const movieResult = await checkMovie.update(modalMovie);
                const { id, name, startDate, time, evaluate, description, poster, trailer } = movieResult;
                complete(res, { id, name, startDate, time, evaluate, description, poster, trailer, images: JSON.parse(movieResult.images) });
            } else {
                errFE(res, null, 'the movie is not exist');
            }

        } else {
            errFE(res, null, "can not get data")
        }

    } catch(err) {
        errBE(res, err);
    }

}

// delete delete by id from params
const deleFilm = async (req, res) => {
    try{
        const { id } = req.params;
        
        if(id){

            const existFilm = await Movie.findOne({ where: {
                id: Number(id),
                deleted: false
            }});

            if(existFilm){
                const filResult = await existFilm.update({ deleted: true });
                complete(res, null, 'delete movie done !!!');
            } else {
                errFE(res, null, "this movie is not existing");
            }

        } else {
            errFE(res, null, "can not get data")
        }

    } catch(err) {
        errBE(res, err, "there some error from action !");
    }
}

//create a movie in movie list
const createMovie = async (req, res) => {
    try{
        const { name, startDate, time, evaluate, description, trailer } = req.body;
        const poster = req.files['poster'][0].path;
        const images = JSON.stringify(req.files['images']?.map((image, index) => image.path));

        const modalMovie = { name, startDate, time, evaluate, description, poster, trailer, images};
        
        if(name && startDate && time && evaluate && description && poster && trailer && images){
            const checkMovie = await Movie.findOne({ where: { name }});
            if(checkMovie){
                errFE(res, null, 'your movie name has already exist');
            }
            if(!checkMovie){
                const resultCreateMovie = await Movie.create(modalMovie);
                complete(res, { id: resultCreateMovie.id, images: JSON.parse(resultCreateMovie.images),...modalMovie});
            }
        } else {
            errFE(res, null, "don't have enough data for movie");
        }

    } catch(err) {
        errBE(res, err, "there some error from action !");
    }
}


module.exports = {
    getAllFilm,
    getDetailFilm,
    updateFilm,
    deleFilm,
    createMovie
}