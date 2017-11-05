const router = require('express').Router();
const MovieLibraryController = require('../controllers/MovieLibraryController');

router.get('/movie-library', MovieLibraryController.get);

module.exports = router;
