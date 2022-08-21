const multer = require('multer');

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, `${process.cwd()}/public/assets/image`);
    },
    filename(req, file, cb) {
        const uniName = Date.now() + file.originalname;
        cb(null, uniName);
    }
});

const upLoadImage = multer({ storage });

module.exports = {
    upLoadImage
};