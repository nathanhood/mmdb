const DB = require('../models');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const initialize = (app) => {
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
        issuer: process.env.JWT_ISSUER,
    };

    passport.use(new JwtStrategy(opts, (jwtPayload, next) => {
        DB.User.findById(jwtPayload.id)
            .then((user) => {
                if (!user) {
                    return next(null, false);
                }

                return next(null, user);
            })
            .catch((e) => {
                next(e, false);
            });
    }));

    return app.use(passport.initialize());
};

const middleware = () => {
    return passport.authenticate('jwt', { session: false });
};

middleware.initialize = initialize;

module.exports = middleware;
