const DB = require('../models/index');

const getUserMoviesWithGenres = (User) => {
    return User.getMovies({ include: [DB.Genre] })
        .then((movies) => movies.map((movie) => movie.get({ plain: true })));
};

module.exports = {
    getUserMoviesWithGenres,
};
