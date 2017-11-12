const DB = require('../models');

const get = (req, res) => {
    req.user.getMovies({ include: [DB.Genre] }).then(movies => {
        res.json(movies);
    });
};

module.exports = {
    get
};
