const multer = require('multer');

const jwt = require('jsonwebtoken');
const { AccessToken, User } = require('../models/index');
const { secret_key } = require('./enviroment');

const response = require('./response');
const { errFE, errBE } = response;

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, `${process.cwd()}/public/assets/image`);
    },
    filename(req, file, cb) {
        const uniName = Date.now() + file.originalname;
        cb(null, uniName);
    }
});

const verifyToken = async (req, res, next) => {
    const accessToken = req.header('accessToken');

    if(accessToken){
        try {
            const convertToken = jwt.verify(accessToken, secret_key);
            if(convertToken) {
                const tokenName = await AccessToken.findOne({ where: {token: convertToken.data}});
                if(tokenName){
                    next();
                } else { errFE(res, null, "your access token not existing"); }
            }
        } catch(err) {
            errBE(res, null, "your access token is invalid !!!");
        }
    } else {
        errFE(res, null, "Please input your access token");
    }

}

const verifyUserToken = async (req, res, next) => {
    const token = req.header('token'); 
        try{
            const convertToken = jwt.verify(token, secret_key);
            if(convertToken.data.user_type === 'admin') {
                    next();
                } else {
                errFE(res, null, "You don't have permission to access this data")
            }
        }
        catch(err){
            errBE(res, null, "your token is invalid !!!");
        }
}

const checkUsertoken = async (req, res, next) => {
    const token = req.header('token');

    if(token) {
        try{
            const convertToken = jwt.verify(token, secret_key);
            if(convertToken) {
                const tokenName = await User.findOne({ where: {username: convertToken.data.username}});
                if(tokenName){
                    next();
                } else { errFE(res, null, "your access token not existing"); }
            }
        }catch(err){
            errBE(res, null, "your token is invalid !!!");
        }
    } else{
        errFE(res, null, "Don't have any user token")
    }

}

const upLoadImage = multer({ storage });

module.exports = {
    upLoadImage,
    verifyToken,
    verifyUserToken,
    checkUsertoken
};