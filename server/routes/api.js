const router = require('express').Router();
const moviesController = require('../controllers/moviesController');
const checkTmdbConfig = require('../middlewares/movieApiMiddlware');

checkTmdbConfig(router);

router.get('/movies', moviesController.get);
router.post('/movies', moviesController.store);

module.exports = router;
