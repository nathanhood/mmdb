/* eslint-disable */
const { getUserMovies } = require('../../models/services/movie');
const ssr = require('../../build/server.js').default;
const movieTransformer = require('../../transformers/movieTransformer');

const get = (req, res) => {
    return res.send(ssr.renderSkeleton());

    getUserMovies(req.user.id).then((movies) => {
        res.send(ssr.render({
            dashboard: {
                library: movieTransformer.transformMany({ movies }).payload,
                isLoaded: true,
            },
        }));
    });
};

module.exports = {
    get,
};
