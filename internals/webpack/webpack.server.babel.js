const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = require('./webpack.base.babel')({
    // Add hot reloading in development
    entry: [
        path.join(process.cwd(), 'server/webpackEntry.js'), // Start with js/serverEntry.js
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

    styleLoaders: [
        {
            loader: 'css-loader/locals',
            options: {
                modules: true,
                importLoaders: 2,
                localIdentName: '[name]__[local]___[hash:base64:5]',
            },
        },
        'sass-loader',
        {
            loader: 'bulma-loader',
            options: {
                theme: 'app/variables.sass',
            },
        },
    ],

    plugins: [],

    overrides: {
        name: 'server',

        // Leave all node related dependencies out of bundle
        // since they will be available in any Node process
        externals: [nodeExternals()],
    },
});
