const { getUserMoviesWithGenres } = require('../../services/moviesService');
const handleRender = require('../../build/server.js').default;

const get = (req, res) => {
    getUserMoviesWithGenres(req.user).then((movies) => {
        res.send(handleRender('Dashboard', {
            dashboard: {
                library: movies.map((movie) => movie.get({ plain: true })),
                isLoaded: true,
            },
        }));
    });
};

module.exports = {
    get,
};
