const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = require('./webpack.base.babel')({
    // Add hot reloading in development
    entry: [
        path.join(process.cwd(), 'server/SSR.js'), // Start with js/SSR.js
    ],

    output: {
        path: path.resolve(process.cwd(), 'server/build'),
        filename: 'server.js',
        libraryTarget: 'commonjs2',
    },

    // Specify that output will be processed in node environment
    target: 'node',

    babelQuery: {
        presets: [
            ['env', {
                targets: {
                    node: 'current',
                },
            }],
            'react',
            'stage-0',
        ],
    },

    plugins: [],

    overrides: {
        name: 'server',

        // Leave all node related dependencies out of bundle
        // since they will be available in any Node process
        externals: [nodeExternals()],
    },
});
