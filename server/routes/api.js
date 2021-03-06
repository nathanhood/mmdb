const router = require('express').Router();
const moviesController = require('../controllers/moviesController');
const searchNewController = require('../controllers/searchNewController');
const formatsController = require('../controllers/formatsController');
const checkTmdbConfig = require('../middlewares/movieApiMiddlware');

checkTmdbConfig(router);

router.get('/search/movie', searchNewController.searchMovies);

router.get('/movies', moviesController.index);
router.post('/movies', moviesController.store);
router.get('/movies/recent-formats', moviesController.getRecentFormats);
router.get('/movies/genres', moviesController.genreIndex);
router.get('/movies/:id', moviesController.show);
router.put('/movies/:id/favorite', moviesController.favorite);
router.put('/movies/:id/unfavorite', moviesController.unFavorite);
router.delete('/movies/:id', moviesController.destroy);

router.get('/formats', formatsController.index);

module.exports = router;
