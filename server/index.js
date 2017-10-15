/* eslint consistent-return:0 */

const express = require('express');
const logger = require('./logger');
const argv = require('./argv');
const port = require('./port');
// const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok = (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel ? require('ngrok') : false;
const resolve = require('path').resolve;
// const app = express();
// const appPath = resolve(process.cwd(), 'app');
// const App = require(`${appPath}/containers/Homepage`);
// const fs = require('fs');
// var { renderToString } = require('react-dom/server');
// const webpackConfig = require('../internals/webpack/webpack.server.babel');
// const webpack = require('webpack');

// import logger from './logger';
// import argv from './argv';
// import port from './port';
// import { resolve } from 'path';
// import express from 'express';
// import fs from 'fs';
// import handleRender from '../build/server.js';
const handleRender = require('./build/server.js');
const app = express();

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);

// In production we need to pass these values in instead of relying on webpack
// setup(app, {
//     outputPath: resolve(process.cwd(), 'build'),
//     publicPath: '/',
// });
if (isDev) {
    const webpackConfig = require('../internals/webpack/webpack.dev.babel');
    const addDevMiddlewares = require('./middlewares/addDevMiddlewares');
    addDevMiddlewares(app, webpackConfig);
}

// Serve static files
app.use('/', express.static(resolve(process.cwd(), 'build')));

app.get('/', (req, res) => {
    // TODO: Create store
    res.send(handleRender.default());
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// Start your app.
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
