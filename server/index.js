/* eslint consistent-return:0 */

const express = require('express');
const logger = require('./logger');
const argv = require('./argv');
const port = require('./port');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok = (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel ? require('ngrok') : false;
const resolve = require('path').resolve;
const compression = require('compression');
const handleRender = require('./build/server.js');
const app = express();

/**
 * API endpoints
 */
// app.use('/api', myApi);

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

app.get('*', (req, res) => {
    res.send(handleRender.default());
});

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
