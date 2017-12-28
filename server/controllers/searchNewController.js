const MovieApiService = require('../services/MovieApiService');
const movieTransformer = require('../transformers/movieTransformer');
const paginate = require('../utils/pagination')();
const { getUserMoviesByTmdbId } = require('../models/services/movie');
const { getAllGenres } = require('../models/services/genre');
const { keyBy } = require('../models/services/utils');

const searchMovies = (req, res) => {
    const apiService = new MovieApiService();

    apiService.searchForNewMovie(req.query.query, req.query.page || 1)
        .then(async ({ totalResults, page, movies }) => {
            const ownedMovieDictionary = await getUserMoviesByTmdbId(
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
                movies: movies.map((movie) => {
                    const isOwned = ownedMovieDictionary.hasOwnProperty(movie.tmdbId);

                    return {
                        ...movie,
                        id: isOwned ? ownedMovieDictionary[movie.tmdbId].id : 0,
                        genres: movie.genreIds.map((genreId) => genreDictionary[genreId]),
                        isOwned,
                    };
                }),
            }));
        }).catch((e) => {
            // TODO: Determine error logging and API response format
            res.status(500).send(e.message);
        });
};

module.exports = {
    searchMovies,
};
