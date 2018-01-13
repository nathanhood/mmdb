const _ = require('lodash');
const DEFAULT_DIGITAL_PLATFORMS = require('./platforms');
const definitions = require('./definitions');
const keyedDefinitions = _.keyBy(definitions, 'value');

const FORMATS = [
    {
        display: 'Digital',
        value: 'digital',
        platforms: DEFAULT_DIGITAL_PLATFORMS,
        definitions: [...definitions],
    },
    {
        display: 'DVD',
        value: 'dvd',
        platforms: [],
        definitions: [keyedDefinitions.sd],
    },
    {
        display: 'Blu-ray',
        value: 'blu-ray',
        platforms: [],
        definitions: [keyedDefinitions.hd],
    },
    {
        display: '4k Ultra HD',
        value: 'uhd-blu-ray',
        platforms: [],
        definitions: [keyedDefinitions['4k']],
    },
    {
        display: 'HD DVD',
        value: 'hd-dvd',
        platforms: [],
        definitions: [keyedDefinitions.hd],
    },
];

module.exports = FORMATS;
