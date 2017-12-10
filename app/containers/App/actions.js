export const SHOW_SEARCH = 'SHOW_SEARCH';
export const HIDE_SEARCH = 'HIDE_SEARCH';
export const START_LOADING = 'START_LOADING';
export const END_LOADING = 'END_LOADING';
export const POPULATE_SEARCH_RESULTS = 'POPULATE_SEARCH_RESULTS';
export const SHOW_SEARCH_RESULTS = 'SHOW_SEARCH_RESULTS';
export const CLAIM_SEARCH_RESULT_AS_OWNED = 'CLAIM_SEARCH_RESULT_AS_OWNED';
export const UNCLAIM_SEARCH_RESULT_AS_OWNED = 'UNCLAIM_SEARCH_RESULT_AS_OWNED';
export const SET_ID_ON_SEARCH_RESULT = 'SET_ID_ON_SEARCH_RESULT';
export const POPULATE_RECENT_FORMATS = 'POPULATE_RECENT_FORMATS';

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
