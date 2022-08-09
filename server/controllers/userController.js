const Models = require('../models/index');
const { User } = Models;

const getAllUsers = async (req, res) => {
    const allUsers = await User.findAll();
    res.status(200).send(allUsers);
}

module.exports = {
    getAllUsers
}