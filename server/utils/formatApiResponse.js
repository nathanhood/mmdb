/**
 * Format array of data for API response
 *
 * @param  {Array} entities
 * @return {Object}
 */
const forMany = (entities = []) => {
    if (!Array.isArray(entities)) {
        throw new TypeError(`Expected an array. ${typeof entities} provided.`);
    }

    return {
        count: entities.length,
        payload: entities,
    };
};

module.exports = {
    forMany,
};
