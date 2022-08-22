const Models = require('../models/index');
const response = require('../config/response');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const enviroment = require('../config/enviroment');
const { secret_key } = enviroment;

const { User } = Models;
const { errBE, errFE, complete } = response;

//login feature for user
const userLogin = async (req, res) => {

    const { username, password } = req.body;

    try{
        const checkUser = await User.findOne({ where: { username }, attributes: {
            exclude: ['deleted']
        }});

        if(checkUser){
            const checkPassword = await bcrypt.compareSync(password, checkUser.password);

            if(checkPassword){

                const userToken = jwt.sign({
                    data: checkUser,
                  }, 
                  secret_key, 
                  { expiresIn: '30 days' });

                complete(res, {
                    ...checkUser.dataValues,
                    userToken
                  }, "login successful");
            } else {
                errFE(res, null, "your password is incorrect !!!");
            }

        }

        if(!checkUser){
            errFE(res, null, 'can not found your username !!!');
        }

    } catch(err) {
        errBE(res, err, "there some error from action !");
    }
}

//register for user
const userRegist = async (req, res) => {
    const { username, password, phone, email } = req.body;

    try{
        const checkUser = await User.findOne({ where: { username }});

        if(checkUser){
            errFE(res, null, 'your username has already exist !!!');
        }

        if(!checkUser){

            const newPassword = await bcrypt.hashSync(password, saltRounds);

            const modalUser = { username, password: newPassword, phone, email };
            const resultRegist = await User.create(modalUser);

            if(resultRegist){
                complete(res, {id:resultRegist.id, username, password: resultRegist.password, phone, email });
            }
        }

    } catch(err) {
        errBE(res, err, "there some error from action !");
    }
}

module.exports = {
    userLogin,
    userRegist
}