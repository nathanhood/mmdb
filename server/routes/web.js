const router = require('express').Router();
const dashboardController = require('../controllers/pages/dashboardController');

router.get('*', dashboardController.get);

module.exports = router;
