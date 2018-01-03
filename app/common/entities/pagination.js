import PropTypes from 'prop-types';

export const paginationPropTypeShape = PropTypes.shape({
    currentPage: PropTypes.number,
    pageResult: PropTypes.array,
    pages: PropTypes.object,
    result: PropTypes.array,
});

export const PAGINATE_ENTITY = 'entities/PAGINATE';

const _insertCurrentPage = (currentPage, pageResult = []) => {
    const resultLength = pageResult.length;

    if (!resultLength) {
        return [currentPage];
    }

    if (pageResult[0] > currentPage) {
        return [currentPage, ...pageResult];
    } else if (pageResult[resultLength - 1] < currentPage) {
        return [...pageResult, currentPage];
    }

    return pageResult;
};

const initialState = {
    currentPage: null,
    result: [], // All ids in order to be displayed
    pages: {}, // All ids paginated
    pageResult: [], // All page ids in order to be displayed
};

/**
 * Turns any state property into a pagination object given an
 * entity response and the relevant slice of state
 *
 * @param {object} normalizedData
 * @param {object} prevState
 */
export const paginateEntity = (normalizedData, prevState = initialState) => {
    const { raw: { page } } = normalizedData;
    const currentPage = parseInt(page);
    const pageResult = _insertCurrentPage(currentPage, prevState.pageResult);
    const pages = {
        ...prevState.pages,
        [currentPage]: normalizedData.result,
    };
    const result = pageResult.reduce((accumulator, pageId) => accumulator.concat(pages[pageId]), []);

    return {
        currentPage,
        result,
        pages,
        pageResult,
    };
};

export const selectHydrated = (entity, selector, state) => {
    return {
        ...entity,
        pages: entity.pageResult.reduce((result, pageId) => ({
            ...result,
            [pageId]: entity.pages[pageId]
                .map((id) => selector(state, id)),
        }), {}),
    };
};
