const DB = require('../models');

module.exports = app => {
    return app.use('/', (req, res, next) => {
        // TODO: Retrieve user id from request
        DB.User.findById(1).then(user => {
            if (user) {
                req.user = user;
                next();
            } else {
                res.send(403);
            }
        });
    });
};
