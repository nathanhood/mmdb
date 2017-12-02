const DB = require('../index');
const { toPlainObjects } = require('./common');

const getUserMoviesWithGenres = (User) => {
    return User.getMovies({ include: [DB.Genre] })
        .then((movies) => toPlainObjects(movies));
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

module.exports = {
    getUserMoviesWithGenres,
    countUserMovies,
    findUserMoviesByTmdbId,
};
