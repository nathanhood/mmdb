const { getUserMoviesWithGenres } = require('../../models/services/movie');
const handleRender = require('../../build/server.js').default;
const movieTransformer = require('../../transformers/movieTransformer');

const get = (req, res) => {
    getUserMoviesWithGenres(req.user.id).then((movies) => {
        console.log(movies[0].Users);
        res.send(handleRender({
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
