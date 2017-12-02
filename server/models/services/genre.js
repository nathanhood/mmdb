const DB = require('../index');
const { toPlainObjects } = require('./common');

const getAllGenres = (key) => {
    return DB.Genre.findAll().then(toPlainObjects);
};

module.exports = {
    getAllGenres,
};
