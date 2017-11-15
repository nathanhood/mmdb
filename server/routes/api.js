const router = require('express').Router();
const MovieLibraryController = require('../controllers/MovieLibraryController');
const checkTmdbConfig = require('../middlewares/tmdb');

checkTmdbConfig(router);

router.get('/movies', MovieLibraryController.get);
router.post('/movies', MovieLibraryController.store);

module.exports = router;
