const MovieApiService = require('../services/MovieApiService');
const movieTransformer = require('../transformers/movieTransformer');
const paginate = require('../utils/pagination')();
const { findUserMoviesByTmdbId } = require('../models/services/movie');
const { getAllGenres } = require('../models/services/genre');
const { keyBy } = require('../models/services/common');

const searchMovies = (req, res) => {
    const apiService = new MovieApiService();

    apiService.searchForNewMovie(req.query.query, req.query.page || 1)
        .then(async ({ totalResults, page, movies }) => {
            const ownedMovieDictionary = await findUserMoviesByTmdbId(
                req.user.id,
                movies.map((movie) => movie.tmdbId)
            ).then(keyBy('tmdbId'));
            const genreDictionary = await getAllGenres().then(keyBy('tmdbId'));
            const pagination = await paginate(
                Promise.resolve(totalResults),
                page,
                movies.length
            );

            res.json(movieTransformer.transformMany({
                ...pagination,
                movies: movies.map((movie) => ({
                    ...movie,
                    genres: movie.genreIds.map((genreId) => genreDictionary[genreId]),
                    isOwnedByUser: ownedMovieDictionary.hasOwnProperty(movie.tmdbId),
                })),
            }));
        }).catch((e) => {
            // TODO: Determine error logging and API response format
            res.status(500).send(e.message);
        });
};

module.exports = {
    searchMovies,
};
