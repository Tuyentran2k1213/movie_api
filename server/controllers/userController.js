const Models = require('../models/index');
const response = require('../config/response');

const { User } = Models;
const { errFE, errBE, complete } = response;

//get all the user in list
const getAllUsers = async (req, res) => {
    try{
        const allUsers = await User.findAll({ where: { deleted: false },  attributes: {
            exclude: ['deleted']} });
        complete(res, allUsers);
    } catch(err) {
        errBE(res, err);
    }
}

// user with already has id in params
const getUserById = async (req, res) => {

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
            } else {
                errFE(res, null, 'the id user is not exist')
            }

        }else {
            errFE(res, null, "can not get id from the params")
        }

    } catch(err) {
        errBE(res, err);
    }
    
}

// update user by id im params
const updateUser = async (req, res) => {
    try{
        const { id } = req.params;
        const { username, email, phone, password, user_type } = req.body;

        let modalUser;

        if(user_type){
            modalUser = { username, email, phone, password, user_type: user_type ? 'client' : user_type };
        } else{
            modalUser = { username, email, phone, password };
        }
        
        if(id && username && email && phone && password){

            const checkUser = await User.findOne({ where: {
                id: Number(id),
                deleted: false
            }});

            if(checkUser){
                const userResult = await checkUser.update(modalUser);
                const { username, email, phone, password } = userResult;
                complete(res, { username, email, phone, password });
            } else {
                errFE(res, null, 'user id does not exist');
            }

        } else {
            errFE(res, null, "can not get data")
        }

    } catch(err) {
        errBE(res, err);
    }

}

// delete user by id from params
const deleUser = async (req, res) => {
    try{
        const { id } = req.params;
        
        if(id){

            const checkUser = await User.findOne({ where: {
                id: Number(id),
                deleted: false
            }});

            if(checkUser){
                const result = await checkUser.update({ deleted: true });
                complete(res, null, 'delete done !!!');
            } else {
                errFE(res, null, "this user id is not existing");
            }

        } else {
            errFE(res, null, "can not get data")
        }

    } catch(err) {
        errBE(res, err, "there some error from action !");
    }
}

//create a user
const createUser = async (req, res) => {
    try{
        const { username, email, phone, password, user_type } = req.body;
        const modalUser = { username, email, phone, password, user_type: user_type ? 'client' : user_type };
        if(username && email && phone && password){
            const checkUser = await User.findOne({ where: { username }});
            if(checkUser){
                errFE(res, null, 'your username has already exist');
            }
            if(!checkUser){
                const resultCreate = await User.create(modalUser);
                complete(res, { id: resultCreate.id, ...modalUser, password: resultCreate.password});
            }
        } else {
            errFE(res, null, "don't have enough ");
        }

    } catch(err) {
        errBE(res, err, "there some error from action !");
    }
}


module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    deleUser,
    createUser
}