const _ = require('lodash');
const imageConfig = require('../config/tmdb.json').images;
const formatApiResponse = require('../utils/formatApiResponse');

const getImageUrl = (baseUrl, size, imagePath) => `${baseUrl}${size}${imagePath}`;

const getAllImageSizes = (imagePath, type) => {
    const baseUrl = imageConfig.base_url;
    const sizes = imageConfig[`${type}_sizes`];

    if (!imagePath) {
        return null;
    }

    if (!sizes) {
        throw new Error(`Incorrect image type ${type} provided`);
    }

    return sizes.map((size) => ({
        size,
        name: imagePath.replace('/', ''),
        url: getImageUrl(baseUrl, size, imagePath),
    }));
};

const transformMovie = (movie) => ({
    ...movie,
    images: {
        poster: getAllImageSizes(movie.poster, 'poster'),
        backdrop: getAllImageSizes(movie.backdrop, 'backdrop'),
    },
});

const transformMovies = (movies) => movies.map((movie) => transformMovie(movie));

module.exports = {
    transformOne: transformMovie,
    transformMany: _.flow(transformMovies, formatApiResponse.forMany),
};
