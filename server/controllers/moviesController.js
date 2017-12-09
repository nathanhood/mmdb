const DB = require('../models');
const MovieApiService = require('../services/MovieApiService');
const { getUserMoviesWithGenres, countUserMovies, addUserMovie } = require('../models/services/movie');
const movieTransformer = require('../transformers/movieTransformer');
const paginate = require('../utils/pagination')();

const get = (req, res) => {
    const { order, limit, page } = req.query;
    const { id: userId } = req.user;

    paginate(countUserMovies(userId), page, limit)
        .then((pagination) => {
            getUserMoviesWithGenres(userId, pagination.limit, pagination.offset, order).then((movies) => {
                res.json(movieTransformer.transformMany({ ...pagination, movies }));
            });
        });
};
    });
};

const store = (req, res) => {
    const movieId = req.body.id;
    const format = req.body.format;
    const movieApi = new MovieApiService();

    DB.Movie.findOneByTmbdId(movieId)
        .then((movie) => {
            if (!movie) {
                return movieApi.getMovieByTmdbId(movieId)
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
            return addUserMovie(req.user, movie, format);
        }).then((movie) => {
            res.json(movieTransformer.transformOne(movie));
        });
};

const destroy = async (req, res) => {
    const userMovie = await DB.UserMovie.find({
        where: {
            userId: req.user.id,
            movieId: req.params.id,
        },
    });

    if (userMovie) {
        userMovie.destroy();
    }

    res.json({ success: true });
};

module.exports = {
    get,
    store,
    destroy
};
