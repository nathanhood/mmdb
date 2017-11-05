const resolve = require('path').resolve;
const pullAll = require('lodash/pullAll');
const uniq = require('lodash/uniq');

const ReactBoilerplate = {
    // This refers to the react-boilerplate version this project is based on.
    version: '3.4.0',

    /**
     * The DLL Plugin provides a dramatic speed increase to webpack build and hot module reloading
     * by caching the module metadata for all of our npm dependencies. We enable it by default
     * in development.
     *
     *
     * To disable the DLL Plugin, set this value to false.
     */
    dllPlugin: false,
};

module.exports = ReactBoilerplate;
