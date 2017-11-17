const DB = require('../models');
const MovieApiService = require('../services/MovieApiService');
const { getUserMoviesWithGenres } = require('../services/moviesService');

const get = (req, res) => {
    getUserMoviesWithGenres(req.user).then(movies => {
        res.json(movies);
    });
};

const store = (req, res) => {
    const movieId = req.body.id;
    const movieApi = new MovieApiService();

    DB.Movie.findOneByTmbdId(movieId)
        .then((movie) => {
            if (!movie) {
                return movieApi.getMovieByTmdbId(req.body.id)
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
