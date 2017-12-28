const DB = require('../index');

const findUserMovieById = (id) => {
    return DB.UserMovie.findOne({ where: { id } });
};

const findUserMovieByUserAndMovie = (userId, movieId) => {
    return DB.UserMovie.findOne({
        where: { userId, movieId },
    });
};

module.exports = {
    findUserMovieById,
    findUserMovieByUserAndMovie,
};
