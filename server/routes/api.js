const router = require('express').Router();
const moviesController = require('../controllers/moviesController');
const searchNewController = require('../controllers/searchNewController');
const checkTmdbConfig = require('../middlewares/movieApiMiddlware');

checkTmdbConfig(router);

router.get('/search/movie', searchNewController.searchMovies);

router.get('/movies', moviesController.get);
router.post('/movies', moviesController.store);

module.exports = router;
