const _ = require('lodash');
const Op = require('sequelize').Op;

const toPlainObject = (object) => object.get({ plain: true });

const toPlainObjects = (objects) => objects.map(toPlainObject);

const keyBy = (key) => (array) => _.keyBy(array, key);

const movieWhere = (query) => {
    const trimmedQuery = _.isEmpty(query) ? null : query.trim();

    if (!trimmedQuery) {
        return undefined;
    }

    return {
        title: {
            [Op.like]: `%${trimmedQuery}%`,
        },
    };
};

module.exports = {
    keyBy,
    toPlainObject,
    toPlainObjects,
    movieWhere,
};
