// Important modules this config uses
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const DEFAULT_TEMPLATE = 'index.html';
const SERVER_TEMPLATE_PATH = '../server/templates/index.html';
const htmlConfig = (fileName = DEFAULT_TEMPLATE) => ({
    template: `app/${DEFAULT_TEMPLATE}`,
    filename: fileName,
    minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
    },
    inject: true,
});

module.exports = require('./webpack.base.babel')({
    // In production, we skip all hot-reloading stuff
    entry: [
        path.join(process.cwd(), 'app/app.js'),
    ],

    // Utilize long-term caching by adding content hashes (not compilation hashes) to compiled assets
    output: {
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].chunk.js',
    },

    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            children: true,
            minChunks: 2,
            async: true,
        }),

        // Create a copy of index.html for server
        new HtmlWebpackPlugin(htmlConfig(SERVER_TEMPLATE_PATH)),

        new ExtractTextPlugin({
            filename: '[name].[chunkhash].css',
            allChunks: true,
            ignoreOrder: true,
        }),
    ],

    performance: {
        assetFilter: (assetFilename) => !(/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename)),
    },
});
