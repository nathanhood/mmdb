const DB = require('../index');
const { toPlainObject } = require('./utils');

const createNewUser = (data) => DB.User.create(data).then(toPlainObject);

const findUserByUsername = (username) => DB.User.findOne({ where: { username } }).then((user) => user ? toPlainObject(user) : null);

module.exports = {
    createNewUser,
    findUserByUsername,
};
