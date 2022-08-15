const jwt = require('jsonwebtoken');
const { AccessToken } = require('../models/index');
const { secret_key } = require('./enviroment');

const accessToken = async (token) => {
    try {
        const convertToken = jwt.verify(token, secret_key);
        if(convertToken) {
            const tokenName = await AccessToken.findOne({ where: {token: convertToken.data}});
            if(tokenName){
                return true;
            } else {return false;}
        }
    } catch(err) {
        return false;
    }
}

module.exports = accessToken;