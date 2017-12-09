const getTotalPages = (totalResults, limit) => Math.ceil(totalResults / limit);

const getOffset = (page, limit) => (page - 1) * limit;

module.exports = (defaultLimit = 15) => {
    return (countPromise, page = 1, limit = defaultLimit) => {
        page = parseInt(page);
        limit = parseInt(limit);

        return countPromise.then((totalResults) => ({
            page,
            totalPages: getTotalPages(totalResults, limit),
            limit,
            offset: getOffset(page, limit),
            totalResults,
        }));
    };
};
