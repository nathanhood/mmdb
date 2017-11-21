const DB = require('../index');

const getUserMoviesWithGenres = (User) => {
    return User.getMovies({ include: [DB.Genre] })
        .then((movies) => movies.map((movie) => movie.get({ plain: true })));
};

const countUserMovies = (userId) => {
    return DB.Movie.count({
        include: [
            { model: DB.User, where: { id: userId } },
        ],
    });
};

module.exports = {
    getUserMoviesWithGenres,
    countUserMovies,
};
