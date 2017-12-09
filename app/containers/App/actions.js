import {
    SHOW_SEARCH,
    HIDE_SEARCH,
    START_LOADING,
    END_LOADING,
    POPULATE_SEARCH_RESULTS,
    SHOW_SEARCH_RESULTS,
    CLAIM_SEARCH_RESULT_AS_OWNED,
    UNCLAIM_SEARCH_RESULT_AS_OWNED,
    SET_ID_ON_SEARCH_RESULT,
    POPULATE_RECENT_FORMATS
} from './constants';

export const startLoading = () => ({
    type: START_LOADING,
});

export const endLoading = () => ({
    type: END_LOADING,
});

export const showSearch = (type) => ({
    type: SHOW_SEARCH,
    payload: type,
});

export const hideSearch = () => ({
    type: HIDE_SEARCH,
});

export const populateSearchResults = (list) => ({
    type: POPULATE_SEARCH_RESULTS,
    payload: list,
});

export const showSearchResults = () => ({
    type: SHOW_SEARCH_RESULTS,
});

export const claimSearchResultAsOwned = (id) => ({
    type: CLAIM_SEARCH_RESULT_AS_OWNED,
    payload: id,
});

export const unclaimSearchResultAsOwned = (id) => ({
    type: UNCLAIM_SEARCH_RESULT_AS_OWNED,
    payload: id,
});

export const setIdOnSearchResult = (result) => ({
    type: SET_ID_ON_SEARCH_RESULT,
    payload: result,
});

export const populateRecentFormats = (recentFormats) => ({
    type: POPULATE_RECENT_FORMATS,
    payload: recentFormats,
});
