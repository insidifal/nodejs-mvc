const userModel = require('../models/userModel');

exports.showUsers = (req, res) => {
    const users = userModel.getAllUsers();
    res.render('userView', { users });
};

exports.createUser = (req, res) => {
    const { name, email } = req.body;
    userModel.addUser({ name, email });
    res.redirect('/users');
};
