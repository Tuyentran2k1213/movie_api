const Models = require('../models/index');
const response = require('../config/response');
const checkAccessToken = require('../config/accessToken');

const { Cineplex } = Models;
const { errFE, errBE, complete } = response;

//get all the cineplex in list
const getAllCineplex = async (req, res) => {
    //check if req have accessToken
    const accessToken = req.header('accessToken');
    const verifyToken = await checkAccessToken(accessToken);

    if(verifyToken){
        try{
            const allCineplex = await Cineplex.findAll({ where: { deleted: false },  attributes: {
                exclude: ['deleted']} });
            complete(res, allCineplex);
        } catch(err) {
            errBE(res, err);
        }
    } else {
        errFE(res, null, 'your access token is not available !!');
    }
}

// cineplex with already has id in params
const getCineplexId = async (req, res) => {

    const accessToken = req.header('accessToken');
    const verifyToken = await checkAccessToken(accessToken);

    if(verifyToken){
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
    } else {
        errFE(res, null, 'your access token is not available !!');
    }
    
}

// update cineplex by id im params
const updateCineplex = async (req, res) => {
    const accessToken = req.header('accessToken');
    const verifyToken = await checkAccessToken(accessToken);

    if(verifyToken){
        try{
            const { id } = req.params;
            const { name, logo } = req.body;

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
    } else {
        errFE(res, null, 'your access token is not available !!');
    }

}

// delete delete by id from params
const deleCineplex = async (req, res) => {
    const accessToken = req.header('accessToken');
    const verifyToken = await checkAccessToken(accessToken);

    if(verifyToken){
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
    } else {
        errFE(res, null, 'your access token is not available !!');
    }
}

//create a cineplex
const createCineplex = async (req, res) => {
    const accessToken = req.header('accessToken');
    const verifyToken = await checkAccessToken(accessToken);

    if(verifyToken){
        try{
            const { name, logo } = req.body;
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
    } else {
        errFE(res, null, 'your access token is not available !!');
    }
}


module.exports = {
    getAllCineplex,
    getCineplexId,
    updateCineplex,
    deleCineplex,
    createCineplex
}