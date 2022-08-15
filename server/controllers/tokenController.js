const response = require('../config/response');
const jwt = require('jsonwebtoken');
const Models = require('../models/index');
const enviroment = require('../config/enviroment');

const { secret_key } = enviroment;
const{ AccessToken } = Models;
const { complete, errFE, errBE } = response;

const getNewToken = async (req, res) => {

    const { name } = req.body;

    if(name) {
        const inname = await AccessToken.findOne({ where: { token: name } });

        if(inname?.token){
            // res.status(300).send('your name already exist');
            errFE(res, null, 'your name already exist')
        } else {
            try {
            const result = await AccessToken.create({ token: name });

            const token = jwt.sign({
                data: result.token,
              }, 
              secret_key, 
              { expiresIn: '30 days' });
            
            // res.status(200).send(token);
            complete(res, token);
        } catch(err) {
            // res.status(404).send(err);
            errBE(res,err);
        }
        }
        } else {
            // res.status(303).send('please input your name to get token');
            errFE(res, null, 'please input your name to get token');
        }

}

const getToken = async (req, res) => {
    const { name } = req.body;

    if(name) {
        const inname = await AccessToken.findOne({ where: { token: name } });

        if(inname?.token){

            try {
                const token = jwt.sign({
                    data: inname.token,
                  }, 
                  secret_key, 
                  { expiresIn: '30 days' });
                
                // res.status(200).send(token);
                complete(res, token)
            } catch(err) {
                // res.status(404).send(err);
                errBE(res, err);
            }

        } else {
            // res.status(300).send('your input name is not existing');
            errFE(res, null, 'your input name is not existing');
        }
        } else {
            // res.status(303).send('please input your name to get token');
            errFE(res, null, 'please input your name to get token');
        }
}

module.exports = {
    getNewToken,
    getToken
}