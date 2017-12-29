const DB = require('../index');
const {
    toPlainObjects,
    toPlainObject,
    movieWhere,
} = require('./utils');
const {
    MAX_LIMIT,
    DEFAULT_ORDER,
    DEFAULT_OFFSET,
} = require('./constants');


const _defaultMovieAssociations = [{ model: DB.Genre }];
const _movieAttributes = ['id', 'format', 'definition', 'isFavorite', 'createdAt', 'updatedAt'];
const _includeUser = (id) => {
    let where;

    if (id) {
        where = { id };
    }

    return {
        model: DB.User,
        where,
        required: true
    };
};
const _includeMovie = (where = null, associations = _defaultMovieAssociations) => ({
    model: DB.Movie,
    where,
    required: true,
    include: associations
});
const _formatMovieFromUserMovie = (movie) => {
    delete movie.Movie.createdAt;
    delete movie.Movie.updatedAt;

    return {
        ...movie.Movie,
        id: movie.id,
        User: movie.User,
        format: movie.format,
        definition: movie.definition,
        isFavorite: movie.isFavorite,
        createdAt: movie.createdAt,
        updatedAt: movie.updatedAt,
    };
};
const _formatManyMoviesFromUserMovies = (plainMovies) => plainMovies.map(_formatMovieFromUserMovie);

const getUserMovies = ({ userId, ...options }, raw = false) => {
    const limit = options.limit || MAX_LIMIT;
    const offset = options.offset || DEFAULT_OFFSET;
    const order = options.order || DEFAULT_ORDER;
    const {
        associations,
        query,
    } = options;

    const result = DB.UserMovie.findAll({
        attributes: _movieAttributes,
        include: [
            _includeUser(userId),
            _includeMovie(movieWhere(query), associations),
        ],
        limit,
        offset,
        order: [
            ['createdAt', order],
        ],
    });

    return raw ?
        result :
        result.then(toPlainObjects).then(_formatManyMoviesFromUserMovies);
};

const getUserMoviesByGenre = ({ genre, ...options }) => {
    const associations = {
        model: DB.Genre,
        where: {
            slug: genre,
        },
    };

    return getUserMovies({
        ...options,
        associations,
    }, true)
        .then((userMovies) => {
            return Promise.all(
                userMovies.map((userMovie) => userMovie.Movie.getGenres())
            ).then((genres) => {
                return toPlainObjects(userMovies).map((userMovie, i) => {
                    userMovie.Movie.Genres = toPlainObjects(genres[i]);

                    return userMovie;
                });
            })
                .then(_formatManyMoviesFromUserMovies);
        });
};

const getUserMovieByUserAndMovie = (userId, movieId, associations) => {
    return DB.UserMovie.findOne({
        attributes: _movieAttributes,
        include: [
            _includeUser(userId),
            _includeMovie({ id: movieId }, associations),
        ],
    })
        .then(toPlainObject)
        .then(_formatMovieFromUserMovie);
}

const getUserMovieById = (movieId, associations) => {
    return DB.UserMovie.findOne({
        attributes: _movieAttributes,
        where: { id: movieId },
        include: [
            _includeUser(),
            _includeMovie(null, associations),
        ],
    })
        .then(toPlainObject)
        .then(_formatMovieFromUserMovie);
};

const getRecentUserMovieAdditions = (userId, limit) => {
    return DB.UserMovie.findAll({
        where: { userId },
        order: [
            ['createdAt', 'DESC'],
        ],
        limit,
    }).then((movies) => toPlainObjects(movies));
};

const countUserMovies = ({ userId, genre, query }) => {
    let associations = [
        { model: DB.User, where: { id: userId } },
    ];

    if (genre) {
        associations = [
            ...associations,
            { model: DB.Genre, where: { slug: genre } },
        ];
    }

    return DB.Movie.count({
        include: associations,
        where: movieWhere(query),
    });
};

const getUserMoviesByTmdbId = (userId, movieIds) => {
    return DB.UserMovie.findAll({
        include: [
            _includeUser(userId),
            _includeMovie({ tmdbId: { in: movieIds } }),
        ]
    })
        .then(toPlainObjects)
        .then(_formatManyMoviesFromUserMovies);
};

const addUserMovie = (User, Movie, format, definition) => {
    return User.addMovie(Movie, { through: { format, definition } }).then(() => toPlainObject(Movie));
}

module.exports = {
    getUserMovies,
    getUserMovieById,
    getUserMovieByUserAndMovie,
    countUserMovies,
    getUserMoviesByTmdbId,
    addUserMovie,
    getRecentUserMovieAdditions,
    getUserMoviesByGenre
};
