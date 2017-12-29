const _ = require('lodash');
const formatApiResponse = require('../utils/formatApiResponse');
const { createTransformMany } = require('./utils');

const transformGenre = (genre) => ({
    ...genre,
});

module.exports = {
    transformOne: transformGenre,
    transformMany: _.flow(createTransformMany('genres', transformGenre), formatApiResponse.forMany),
};
