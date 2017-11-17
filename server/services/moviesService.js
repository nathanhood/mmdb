const DB = require('../models/index');

const getUserMoviesWithGenres = (User) => User.getMovies({ include: [DB.Genre] });

module.exports = {
    getUserMoviesWithGenres,
};
