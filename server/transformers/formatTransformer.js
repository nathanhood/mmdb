const _ = require('lodash');
const formatApiResponse = require('../utils/formatApiResponse');
const { createTransformMany } = require('./utils');


const transformFormat = (format) => format;

module.exports = {
    transformOne: transformFormat,
    transformMany: _.flow(
        createTransformMany('formats', transformFormat),
        formatApiResponse.forMany
    ),
}
