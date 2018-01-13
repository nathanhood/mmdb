const DB = require('../models');
const MovieApiService = require('../services/MovieApiService');
const {
    getUserMovies,
    getUserMovieById,
    countUserMovies,
    addUserMovie,
    getRecentUserMovieAdditions,
    getUserMoviesByGenre,
    getUserMovieByUserAndMovie
} = require('../models/services/movie');
const { findUserMovieById } = require('../models/services/usermovie');
const movieTransformer = require('../transformers/movieTransformer');
const paginate = require('../utils/pagination')();
const { MAX_LIMIT } = require('../models/services/constants');
const response = require('../utils/apiResponse');
const { getUserMovieGenres } = require('../models/services/genre');
const genreTransformer = require('../transformers/genreTransformer');

const _search = async (req, res) => {
    const { query, page } = req.query;
    const { id: userId } = req.user;
    const pagination = await paginate(
        countUserMovies({ userId, query }),
        page,
        MAX_LIMIT
    );
    const movies = await getUserMovies({ userId, query });

    res.json(movieTransformer.transformMany({ ...pagination, movies }));
};

const index = async (req, res) => {
    const {
        order,
        limit,
        page,
        query,
        genre,
    } = req.query;
    const { id: userId } = req.user;
    let movies;

    // Text search
    if (query) {
        return _search(req, res);
    }

    const pagination = await paginate(
        countUserMovies({ userId, genre }),
        page,
        limit
    );
    const options = {
        userId,
        limit: pagination.limit,
        offset: pagination.offset,
        order,
        query,
        genre,
    };

    if (genre) {
        movies = await getUserMoviesByGenre(options)
    }

    // Default retrieval of user movies
    if (!movies) {
        movies = await getUserMovies(options);
    }

    return res.json(movieTransformer.transformMany({ ...pagination, movies }));
};

const show = async (req, res) => {
    const movieId = req.params.id;

    const movie = await getUserMovieById(movieId);

    if (!movie) {
        return response.notFound();
    }

    return res.json(movieTransformer.transformOne(movie));
};

const getRecentFormats = (req, res) => {
    const { id: userId } = req.user;

    getRecentUserMovieAdditions(userId, 3).then((movies) => {
        res.json({ payload: movies });
    });
};

const store = async (req, res) => {
    const {
        id: movieId,
        format,
        definition,
        platform,
    } = req.body;
    const { id: userId } = req.user;
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
            return addUserMovie(
                req.user,
                movie,
                format,
                definition,
                platform
            );
        }).then((movie) => {
            // Retrieve full movie data for response
            return getUserMovieByUserAndMovie(userId, movie.id);
        }).then((movie) => {
            res.json(movieTransformer.transformOne(movie));
        });
};

const destroy = async (req, res) => {
    const userMovie = await findUserMovieById(req.params.id);

    if (userMovie) {
        userMovie.destroy();
    }

    res.json(response.success());
};

const favorite = async (req, res) => {
    const { id: movieId } = req.params;
    const userMovie = await findUserMovieById(movieId);

    if (!userMovie) {
        return response.notFound(res);
    }

    await userMovie.update({
        isFavorite: true,
    });

    return res.json(response.success());
};

const unFavorite = async (req, res) => {
    const { id: movieId } = req.params;
    const userMovie = await findUserMovieById(movieId);

    if (!userMovie) {
        return response.notFound(res);
    }

    await userMovie.update({
        isFavorite: false,
    });

    return res.json(response.success());
};

const genreIndex = async (req, res) => {
    const { id: userId } = req.user;
    const genres = await getUserMovieGenres(userId);
    const pagination = await paginate(Promise.resolve(genres.length));

    res.json(genreTransformer.transformMany({ ...pagination, genres }));
};

module.exports = {
    index,
    show,
    store,
    destroy,
    getRecentFormats,
    favorite,
    unFavorite,
    genreIndex,
};
