const DB = require('../index');
const { toPlainObjects } = require('./utils');
const { DEFAULT_ORDER } = require('./constants');

const getAllGenres = () => {
    return DB.Genre.findAll().then(toPlainObjects);
};

const getUserMovieGenres = (userId) => {
    return DB.Genre.findAll({
        include: [
            {
                model: DB.Movie,
                required: true,
                include: {
                    model: DB.UserMovie,
                    where: { userId },
                    required: true,
                },
            },
        ],
        order: [
            ['name', DEFAULT_ORDER]
        ],
    })
        .then(toPlainObjects)
        .then((genres) => genres.map((genre) => {
            // Remove related data as it is not
            // relevant to method return value
            delete genre.Movies;

            return genre;
        }));
}

module.exports = {
    getAllGenres,
    getUserMovieGenres,
};
