const get = (req, res) => {
    req.user.getMovies().then(movies => {
        res.json(movies);
    });
};

module.exports = {
    get
};
