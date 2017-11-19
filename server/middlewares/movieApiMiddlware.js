const fs = require('fs-extra');
const path = require('path');
const MovieApiService = require('../services/MovieApiService');

const TWO_DAYS = 172800000;
const CONFIG_PATH = path.resolve(__dirname, '../config/tmdb.json');

const setConfig = () => new MovieApiService().getConfig()
    .then(({ data }) => fs.writeJson(CONFIG_PATH, data));

module.exports = app => {
    return app.use('/', (req, res, next) => {
        if (fs.pathExistsSync(CONFIG_PATH)) {
            fs.stat(CONFIG_PATH, (err, stats) => {
                const now = new Date();

                if (now.getTime() - stats.mtimeMs > TWO_DAYS) {
                    setConfig().then(() => next());
                } else {
                    next();
                }
            });
        } else {
            setConfig().then(() => next());
        }
    });
};
