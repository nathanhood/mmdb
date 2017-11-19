const { getUserMoviesWithGenres } = require('../../services/moviesService');
const handleRender = require('../../build/server.js').default;

const get = (req, res) => {
    getUserMoviesWithGenres(req.user).then((movies) => {
        res.send(handleRender({
            dashboard: {
                library: movies,
                isLoaded: true,
            },
        }));
    });
};

module.exports = {
    get,
};
