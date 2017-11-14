const router = require('express').Router();
const MovieLibraryController = require('../controllers/MovieLibraryController');
const checkTmdbConfig = require('../middlewares/tmdb');

checkTmdbConfig(router);

router.get('/movie-library', MovieLibraryController.get);

module.exports = router;
