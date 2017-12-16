/* eslint consistent-return:0 */

const resolve = require('path').resolve;
require('dotenv').config({ path: resolve(__dirname, '../.env') });
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./logger');
const argv = require('./argv');
const port = require('./port');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok = (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel ? require('ngrok') : false;
const compression = require('compression');
const webRouter = require('./routes/web');
const apiRouter = require('./routes/api');
const authRouter = require('./routes/auth');
const authMiddleware = require('./middlewares/authMiddleware');
const app = express();

authMiddleware.initialize(app);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Login and Registration routes come before authentication
// so that user has chance to get JWT
app.use('/', authRouter);

// Stop unauthenticated requests from proceeding
app.use(authMiddleware());

// Evaluate API routes
app.use('/api/v1', apiRouter);

/**
 * Dev Mode middleware for hot reloading
 *
 * NOTE: Nothing below this block will be evaluated when in dev mode
 */
if (isDev) {
    const webpackConfig = require('../internals/webpack/webpack.dev.babel'); // eslint-disable-line global-require
    const addDevMiddlewares = require('./middlewares/addDevMiddlewares'); // eslint-disable-line global-require
    addDevMiddlewares(app, webpackConfig);
}

// Compression middleware compresses your server responses which makes them
// smaller (applies also to assets). You can read more about that technique
// and other good practices on official Express.js docs http://mxs.is/googmy
app.use(compression());

// Serve static files from 'build' directory
app.use('/', express.static(resolve(process.cwd(), 'build')));

// Evaluate web routes
app.use('/', webRouter);

// Get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// Start your app
app.listen(port, host, (err) => {
    if (err) {
        return logger.error(err.message);
    }

    // Connect to ngrok in dev mode
    if (ngrok) {
        ngrok.connect(port, (innerErr, url) => {
            if (innerErr) {
                return logger.error(innerErr);
            }

            logger.appStarted(port, prettyHost, url);
        });
    } else {
        logger.appStarted(port, prettyHost);
    }
});
