/**
 * Format array of data for API response
 *
 * @param  {Object}
 * @return {Object}
 */
const forMany = ({ page, totalPages, totalResults, payload }) => {
    if (!Array.isArray(payload)) {
        throw new TypeError(`Expected an array. ${typeof payload} provided.`);
    }

    return {
        page,
        pageResults: payload.length,
        totalPages,
        totalResults,
        payload,
    };
};

module.exports = {
    forMany,
};
