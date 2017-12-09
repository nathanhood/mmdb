const DB = require('../index');
const { toPlainObjects, toPlainObject } = require('./common');

const getUserMoviesWithGenres = (userId, limit, offset, order = 'ASC') => {
    return DB.Movie.findAll({
        include: [
            { model: DB.User, where: { id: userId }, required: true },
            DB.Genre,
        ],
        limit,
        offset,
        order: [
            ['createdAt', order],
        ],
    }).then((movies) => toPlainObjects(movies));
};

const getRecentUserMovieAdditions = (userId, limit) => {
    return DB.UserMovie.findAll({
        where: { userId },
        order: [
            ['createdAt', 'DESC'],
        ],
        limit,
    }).then((movies) => toPlainObjects(movies));
};

const countUserMovies = (userId) => {
    return DB.Movie.count({
        include: [
            { model: DB.User, where: { id: userId } },
        ],
    });
};

const findUserMoviesByTmdbId = (userId, movieIds) => {
    return DB.Movie.findAll({
        where: {
            tmdbId: { in: movieIds },
        },
        include: [
            { model: DB.User, where: { id: userId } },
        ]
    }).then(toPlainObjects);
};

const addUserMovie = (User, Movie, format) => {
    return User.addMovie(Movie, { through: { format } }).then(() => toPlainObject(Movie));
}

module.exports = {
    getUserMoviesWithGenres,
    countUserMovies,
    findUserMoviesByTmdbId,
    addUserMovie,
    getRecentUserMovieAdditions,
};
