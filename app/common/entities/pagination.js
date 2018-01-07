import PropTypes from 'prop-types';
import queryString from 'query-string';
import { push } from 'react-router-redux';

export const paginationPropTypeShape = PropTypes.shape({
    currentPage: PropTypes.number,
    pageResult: PropTypes.array,
    pages: PropTypes.object,
    result: PropTypes.array,
});

export const PAGINATE_ENTITY = 'entities/PAGINATE';

export const firstPageExists = (paginatedEntity) => paginatedEntity.pageResult[0] <= 1;

export const lastPageExists = (paginatedEntity) => {
    const { pageResult, totalPages } = paginatedEntity;

    return pageResult[pageResult.length - 1] >= totalPages;
};

export const getPreviousPage = ({ pageResult }) => {
    return pageResult[0];
};

export const getNextPage = ({ pageResult }) => {
    return pageResult[pageResult.length - 1];
};

export const paginateLocation = (location, page) => (dispatch) => {
    const query = {
        ...queryString.parse(location.search),
        page
    };

    dispatch(push({ ...location, search: queryString.stringify(query) }));
};

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
    const { raw: { page, totalPages } } = normalizedData;
    const currentPage = parseInt(page);
    const pageResult = _insertCurrentPage(currentPage, prevState.pageResult);
    const pages = {
        ...prevState.pages,
        [currentPage]: normalizedData.result,
    };
    const result = pageResult.reduce((accumulator, pageId) => accumulator.concat(pages[pageId]), []);

    return {
        totalPages: parseInt(totalPages),
        currentPage,
        result,
        pages,
        pageResult,
    };
};

export const removeFromPaginatedEntity = (paginatedEntity, entityId) => {
    const pages = paginatedEntity.pageResult.reduce((mergedPages, pageId) => {
        return {
            ...mergedPages,
            [pageId]: paginatedEntity.pages[pageId].filter((id) => id !== entityId),
        };
    }, {});

    return {
        ...paginatedEntity,
        result: paginatedEntity.result.filter((id) => id !== entityId),
        pages,
    }
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
