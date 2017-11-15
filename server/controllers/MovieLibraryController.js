const DB = require('../models');
const Tmdb = require('../gateways/tmdb');

const get = (req, res) => {
    req.user.getMovies({ include: [DB.Genre] }).then(movies => {
        res.json(movies);
    });
};

const store = (req, res) => {
    const movieId = req.body.id;
    const gateway = new Tmdb();

    DB.Movie.findOne({ where: { tmdbId: movieId } })
        .then((movie) => {
            if (!movie) {
                return gateway.getMovieById(req.body.id)
                    .then((movieData) => Promise.all([
                        DB.Movie.create(movieData),
                        DB.Genre.findAll({ where: { tmdbId: { in: movieData.genreIds } } }),
                    ]));
            }

            return [movie];
        }).then(([movie, genres]) => {
            if (!genres) {
                return movie;
            }

            return movie.addGenres(genres).then(() => movie);
        }).then((movie) => {
            return req.user.addMovies([movie]);
        }).then(() => {
            // TODO: Update once API response structure is established
            res.json({ success: true });
        });
}

module.exports = {
    get,
    store
};
