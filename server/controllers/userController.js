const Models = require('../models/index');
const response = require('../config/response');
const checkAccessToken = require('../config/accessToken');

const { User } = Models;
const { errFE, errBE, complete } = response;

//get all the user in list
const getAllUsers = async (req, res) => {
    //check if req have accessToken
    const accessToken = req.header('accessToken');
    const verifyToken = await checkAccessToken(accessToken);

    if(verifyToken){
        try{
            const allUsers = await User.findAll({ where: { deleted: false },  attributes: {
                exclude: ['deleted']} });
            complete(res, allUsers);
        } catch(err) {
            errBE(res, err);
        }
    } else {
        errFE(res, null, 'your access token is not available !!');
    }
}

// user with already has id in params
const getUserById = async (req, res) => {

    const accessToken = req.header('accessToken');
    const verifyToken = await checkAccessToken(accessToken);

    if(verifyToken){
        try{
            const { id } = req.params;
            
            if(id){
                const user = await User.findOne({ where: {
                    id: Number(id),
                    deleted: false
                }, attributes: {
                    exclude: ['deleted']}});

                if(user){
                    complete(res, user);
                }

            } else {
                errFE(res, null, "can not get id from the params")
            }

        } catch(err) {
            errBE(res, err);
        }
    } else {
        errFE(res, null, 'your access token is not available !!');
    }
    
}

// update user by id im params
const updateUser = async (req, res) => {
    const accessToken = req.header('accessToken');
    const verifyToken = await checkAccessToken(accessToken);

    if(verifyToken){
        try{
            const { id } = req.params;
            const { username, email, phone, password } = req.body;

            const modalUser = { username, email, phone, password };
            
            if(id && username && email && phone && password){

                const checkUser = await User.findOne({ where: {
                    id: Number(id),
                    deleted: false
                }});

                if(checkUser){
                    const userResult = await checkUser.update(modalUser);
                    const { username, email, phone, password } = userResult;
                    complete(res, { username, email, phone, password });
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

// delete user by id from params
const deleUser = async (req, res) => {
    const accessToken = req.header('accessToken');
    const verifyToken = await checkAccessToken(accessToken);

    if(verifyToken){
        try{
            const { id } = req.params;
            
            if(id){

                const checkUser = await User.findOne({ where: {
                    id: Number(id),
                    deleted: false
                }});

                if(checkUser){
                    const result = await checkUser.update({ deleted: true });
                    complete(res, result, 'delete done !!!');
                } else {
                    errFE(res, null, "this user id is not existing");
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

//create a user
const createUser = async (req, res) => {
    const accessToken = req.header('accessToken');
    const verifyToken = await checkAccessToken(accessToken);

    if(verifyToken){
        try{
            const { username, email, phone, password } = req.body;
            const modalUser = { username, email, phone, password };
            if(username && email && phone && password){
                const checkUser = await User.findOne({ where: { username }});
                if(checkUser){
                    errFE(res, null, 'your username has already exist');
                }
                if(!checkUser){
                    const resultCreate = await User.create(modalUser);
                    complete(res, {...modalUser, password: resultCreate.password});
                }
            } else {
                errFE(res, null, "don't have enough ");
            }

        } catch(err) {
            errBE(res, err, "there some error from action !");
        }
    } else {
        errFE(res, null, 'your access token is not available !!');
    }
}


module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    deleUser,
    createUser
}