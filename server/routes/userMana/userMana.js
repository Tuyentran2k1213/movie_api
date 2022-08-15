const express = require('express');
const user = express.Router();

const userController = require('../../controllers/userController');

user.get('/getAllUsers', userController.getAllUsers);
user.get('/getUserById/:id', userController.getUserById);
user.put('/updateUser/:id', userController.updateUser);
user.delete('/deleteUser/:id', userController.deleUser);
user.post('/createUser', userController.createUser);

module.exports = user;