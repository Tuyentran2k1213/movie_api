const dotenv = require('dotenv');

dotenv.config();

const {DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DIALECT, SECRET_KEY} = process.env;

module.exports = {
    db_name: DB_NAME,
    db_user: DB_USER,
    db_password: DB_PASSWORD,
    db_host: DB_HOST,
    db_port: DB_PORT,
    db_dialect: DB_DIALECT,
    secret_key: SECRET_KEY
}