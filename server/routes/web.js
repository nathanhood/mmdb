const handleRender = require('../build/server.js');
const router = require('express').Router();

router.get('/', (req, res) => {
    res.send(handleRender.default());
});

module.exports = router;
