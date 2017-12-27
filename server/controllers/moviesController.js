const DB = require('../models');
const MovieApiService = require('../services/MovieApiService');
const {
    getUserMovies,
    countUserMovies,
    addUserMovie,
    getRecentUserMovieAdditions
} = require('../models/services/movie');
const movieTransformer = require('../transformers/movieTransformer');
const paginate = require('../utils/pagination')();
const { MAX_LIMIT } = require('../models/services/constants');

const search = async (req, res) => {
    const { query, page } = req.query;
    const { id: userId } = req.user;
    const pagination = await paginate(countUserMovies(userId, query), page, MAX_LIMIT);
    const movies = await getUserMovies({ userId, query });

    res.json(movieTransformer.transformMany({ ...pagination, movies }));
};

const get = async (req, res) => {
    const { order, limit, page, query } = req.query;
    const { id: userId } = req.user;

    if (query) {
        return search(req, res);
    }

    const pagination = await paginate(countUserMovies(userId, query), page, limit);
    const movies = await getUserMovies({
        userId,
        limit: pagination.limit,
        offset: pagination.offset,
        order,
        query,
    });

    return res.json(movieTransformer.transformMany({ ...pagination, movies }));
};

const getRecentFormats = (req, res) => {
    const { id: userId } = req.user;

    getRecentUserMovieAdditions(userId, 3).then((movies) => {
        res.json({ payload: movies });
    });
};

const store = (req, res) => {
    const {
        id: movieId,
        format,
        definition,
    } = req.body;
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
            return addUserMovie(req.user, movie, format, definition);
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
    destroy,
    getRecentFormats,
};
