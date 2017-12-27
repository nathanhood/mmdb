const Op = require('sequelize').Op;
const DB = require('../index');
const {
    toPlainObjects,
    toPlainObject,
    movieWhere,
} = require('./utils');
const {
    MAX_LIMIT,
    DEFAULT_ORDER,
    DEFAULT_OFFSET,
} = require('./constants');

const getUserMovies = ({ userId, ...options }) => {
    const limit = options.limit || MAX_LIMIT;
    const offset = options.offset || DEFAULT_OFFSET;
    const order = options.order || DEFAULT_ORDER;
    const associations = options.associations || { model: DB.Genre };
    const query = options.query || null;

    return DB.UserMovie.findAll({
        attributes: ['id', 'format', 'definition', 'isFavorite', 'createdAt', 'updatedAt'],
        include: [
            { model: DB.User, where: { id: userId }, required: true },
            { model: DB.Movie, where: movieWhere(query), required: true, include: associations },
        ],
        limit,
        offset,
        order: [
            ['createdAt', order],
        ],
    }).then((movies) => {
        const plainMovies = toPlainObjects(movies);

        return plainMovies.map((movie) => {
            delete movie.Movie.createdAt;
            delete movie.Movie.updatedAt;

            return {
                ...movie.Movie,
                User: movie.User,
                format: movie.format,
                definition: movie.definition,
                isFavorite: movie.isFavorite,
                createdAt: movie.createdAt,
                updatedAt: movie.updatedAt,
            };
        });
    });
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

const countUserMovies = (userId, query) => {
    return DB.Movie.count({
        include: [
            { model: DB.User, where: { id: userId } },
        ],
        where: movieWhere(query),
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

const addUserMovie = (User, Movie, format, definition) => {
    return User.addMovie(Movie, { through: { format, definition } }).then(() => toPlainObject(Movie));
}

module.exports = {
    getUserMovies,
    countUserMovies,
    findUserMoviesByTmdbId,
    addUserMovie,
    getRecentUserMovieAdditions,
};
