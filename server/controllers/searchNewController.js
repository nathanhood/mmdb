const MovieApiService = require('../services/MovieApiService');
const movieTransformer = require('../transformers/movieTransformer');
const paginate = require('../utils/pagination')();

const searchMovies = (req, res) => {
    new MovieApiService().searchForNewMovie(req.query.text, req.query.page || 1)
        .then((results) => {
            const { totalResults, page, movies } = results;

            paginate(Promise.resolve(totalResults), page, movies.length)
                .then((pagination) => {
                    res.json(movieTransformer.transformMany({ ...pagination, movies }));
                });
        }).catch((e) => {
            // TODO: Determine error logging and API response format
            res.status(500).send(e.message);
        });
};

module.exports = {
    searchMovies,
};
