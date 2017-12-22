const DB = require('../index');
const { toPlainObjects } = require('./utils');

const getAllGenres = (key) => {
    return DB.Genre.findAll().then(toPlainObjects);
};

module.exports = {
    getAllGenres,
};
