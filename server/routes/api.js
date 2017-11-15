const router = require('express').Router();
const MoviesController = require('../controllers/MoviesController');
const checkTmdbConfig = require('../middlewares/tmdb');

checkTmdbConfig(router);

router.get('/movies', MoviesController.get);
router.post('/movies', MoviesController.store);

module.exports = router;
