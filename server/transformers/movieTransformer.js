const _ = require('lodash');
const imageConfig = require('../config/tmdb.json').images;
const formatApiResponse = require('../utils/formatApiResponse');

const ORIGINAL_IMAGE_SIZE = 'original';
const BASE_IMAGE_URL = imageConfig.base_url;

const getImageUrl = (baseUrl, size, imagePath) => `${baseUrl}${size}${imagePath}`;

const getAllImageSizes = (imagePath, type) => {
    const sizes = imageConfig[`${type}_sizes`];

    if (!imagePath) {
        return null;
    }

    if (!sizes) {
        throw new Error(`Incorrect image type ${type} provided`);
    }

    return sizes.filter((size) => size !== ORIGINAL_IMAGE_SIZE)
        .map((size) => ({
            width: parseInt(size.replace(/[^0-9]/g, '')),
            name: imagePath.replace('/', ''),
            url: getImageUrl(BASE_IMAGE_URL, size, imagePath),
        }));
};

const transformMovie = (movie) => {
    return {
        ...movie,
        apiId: movie.tmdbId,
        images: {
            poster: {
                altText: movie.title,
                original: getImageUrl(BASE_IMAGE_URL, ORIGINAL_IMAGE_SIZE, movie.poster),
                sizes: getAllImageSizes(movie.poster, 'poster'),
            },
            backdrop: getAllImageSizes(movie.backdrop, 'backdrop'),
        },
    };
};

const transformMovies = (data) => ({
    ...data,
    payload: data.movies.map((movie) => transformMovie(movie)),
});

module.exports = {
    transformOne: transformMovie,
    transformMany: _.flow(transformMovies, formatApiResponse.forMany),
};
