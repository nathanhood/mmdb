const DB = require('../index');
const { toPlainObjects, toPlainObject } = require('./common');

const getUserMoviesWithGenres = (userId, limit, offset, order = 'ASC') => {
    return DB.UserMovie.findAll({
        attributes: ['id', 'format', 'definition', 'isFavorite', 'createdAt', 'updatedAt'],
        include: [
            { model: DB.User, where: { id: userId }, required: true },
            { model: DB.Movie, required: true, include: { model: DB.Genre } },
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

const addUserMovie = (User, Movie, format, definition) => {
    return User.addMovie(Movie, { through: { format, definition } }).then(() => toPlainObject(Movie));
}

module.exports = {
    getUserMoviesWithGenres,
    countUserMovies,
    findUserMoviesByTmdbId,
    addUserMovie,
    getRecentUserMovieAdditions,
};
