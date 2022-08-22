const multer = require('multer');

const jwt = require('jsonwebtoken');
const { AccessToken } = require('../models/index');
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
                } else { errFE(res, null, "your token not existing"); }
            }
        } catch(err) {
            errBE(res, null, "your access token is invalid !!!");
        }
    } else {
        errFE(res, null, "Please input your token");
    }

}

const upLoadImage = multer({ storage });

module.exports = {
    upLoadImage,
    verifyToken
};