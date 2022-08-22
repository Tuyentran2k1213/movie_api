const Models = require('../models/index');
const response = require('../config/response');

const { Cineplex } = Models;
const { errFE, errBE, complete } = response;

//get all the cineplex in list
const getAllCineplex = async (req, res) => {
    try{
        const allCineplex = await Cineplex.findAll({ where: { deleted: false },  attributes: {
            exclude: ['deleted']} });
        complete(res, allCineplex);
    } catch(err) {
        errBE(res, err);
    }
}

// cineplex with already has id in params
const getCineplexId = async (req, res) => {

    try{
        const { id } = req.params;
        
        if(id){
            const cineplex = await Cineplex.findOne({ where: {
                id: Number(id),
                deleted: false
            }, attributes: {
                exclude: ['deleted']}});

            if(cineplex){
                complete(res, cineplex);
            } else {
                errFE(res, null, 'the id of cineplex is not exist')
            }

        }else {
            errFE(res, null, "can not get id from the params")
        }

    } catch(err) {
        errBE(res, err);
    }
    
}

// update cineplex by id im params
const updateCineplex = async (req, res) => {
    try{
        const { id } = req.params;
        const { name } = req.body;
        const logo = req.file.path;

        const modalCineplex = { name, logo };
        
        if(name && logo){

            const checkCineplex = await Cineplex.findOne({ where: {
                id: Number(id),
                deleted: false
            }});

            if(checkCineplex){
                const cineplexResult = await checkCineplex.update(modalCineplex);
                const { name, logo } = cineplexResult;
                complete(res, { name, logo });
            } else {
                errFE(res, null, 'cineplex id does not exist');
            }

        } else {
            errFE(res, null, "can not get data")
        }

    } catch(err) {
        errBE(res, err);
    }

}

// delete delete by id from params
const deleCineplex = async (req, res) => {
    try{
        const { id } = req.params;
        
        if(id){

            const checkCineplex = await Cineplex.findOne({ where: {
                id: Number(id),
                deleted: false
            }});

            if(checkCineplex){
                const cineplexResult = await checkCineplex.update({ deleted: true });
                complete(res, null, 'delete cineplex done !!!');
            } else {
                errFE(res, null, "this cineplex id is not existing");
            }

        } else {
            errFE(res, null, "can not get data")
        }

    } catch(err) {
        errBE(res, err, "there some error from action !");
    }
}

//create a cineplex
const createCineplex = async (req, res) => {
    try{
        const { name } = req.body;
        const logo = req.file.path;
        const modalCineplex = { name, logo };
        if(name && logo){
            const checkCineplex = await Cineplex.findOne({ where: { name }});
            if(checkCineplex){
                errFE(res, null, 'your cineplex name has already exist');
            }
            if(!checkCineplex){
                const resultCreateCineplex = await Cineplex.create(modalCineplex);
                complete(res, { id: resultCreateCineplex.id, ...modalCineplex});
            }
        } else {
            errFE(res, null, "don't have enough data for cineplex");
        }

    } catch(err) {
        errBE(res, err, "there some error from action !");
    }
}


module.exports = {
    getAllCineplex,
    getCineplexId,
    updateCineplex,
    deleCineplex,
    createCineplex
}