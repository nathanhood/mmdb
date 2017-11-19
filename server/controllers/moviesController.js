const DB = require('../models');
const MovieApiService = require('../services/MovieApiService');
const { getUserMoviesWithGenres, countUserMovies } = require('../services/moviesService');
const movieTransformer = require('../transformers/movieTransformer');
const paginate = require('../utils/pagination')();

const get = (req, res) => {
    getUserMoviesWithGenres(req.user).then((movies) => {
        const { limit, page } = req.query;

        paginate(countUserMovies(req.user.id), page, limit)
            .then((pagination) => {
                res.json(movieTransformer.transformMany({ ...pagination, movies }));
            });
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
