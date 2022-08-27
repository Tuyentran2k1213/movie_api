const express = require('express');
const user = express.Router();

const middleware = require('../../config/middleware');

const userController = require('../../controllers/userController');


user.get('/getAllUsers', userController.getAllUsers);
user.get('/getUserById/:id', userController.getUserById);
user.put('/updateUser/:id', userController.updateUser);
user.delete('/deleteUser/:id', middleware.verifyUserToken, userController.deleUser);
user.post('/createUser', middleware.verifyUserToken, userController.createUser);

module.exports = user;