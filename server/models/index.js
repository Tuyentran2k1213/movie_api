const { Sequelize } = require('sequelize');
const enviroment = require('../config/enviroment');
const initModels = require('./init-models');

const { db_name, db_user, db_password, db_host, db_port, db_dialect } = enviroment;

const sequelize = new Sequelize(db_name, db_user, db_password, {
    host: db_host,
    port: db_port,
    dialect: db_dialect
});


const Models = initModels(sequelize);

module.exports = Models;

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }