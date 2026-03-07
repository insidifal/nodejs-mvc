let users = [];

module.exports = {
    getAllUsers: () => users,
    addUser: (user) => users.push(user),
};
