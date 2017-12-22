const _ = require('lodash');

const toPlainObject = (object) => object.get({ plain: true });

const toPlainObjects = (objects) => objects.map(toPlainObject);

const keyBy = (key) => (array) => _.keyBy(array, key);

module.exports = {
    keyBy,
    toPlainObject,
    toPlainObjects,
};
