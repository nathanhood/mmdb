export const POPULATE_SEARCH_RESULTS = 'search/POPULATE_RESULTS';
export const SHOW_SEARCH_RESULTS = 'search/SHOW_RESULTS';
export const SHOW_SEARCH = 'search/SHOW';
export const HIDE_SEARCH = 'search/HIDE';
export const CLAIM_SEARCH_RESULT_AS_OWNED = 'search/CLAIM_SEARCH_RESULT_AS_OWNED';
export const UNCLAIM_SEARCH_RESULT_AS_OWNED = 'search/UNCLAIM_SEARCH_RESULT_AS_OWNED';
export const SET_ID_ON_SEARCH_RESULT = 'search/SET_ID_ON_SEARCH_RESULT';
export const REMOVE_FROM_SEARCH_RESULT = 'search/REMOVE_FROM_SEARCH_RESULT';
export const FAVORITE_SEARCH_RESULT = 'dashboard/FAVORITE_SEARCH_RESULT';
export const UNFAVORITE_SEARCH_RESULT = 'dashboard/UNFAVORITE_SEARCH_RESULT';

export const populateSearchResults = (list) => ({
    type: POPULATE_SEARCH_RESULTS,
    payload: list,
});

export const showSearchResults = () => ({
    type: SHOW_SEARCH_RESULTS,
});

export const showSearch = (type) => ({
    type: SHOW_SEARCH,
    payload: type,
});

export const hideSearch = () => ({
    type: HIDE_SEARCH,
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

export const removeFromSearchResult = (id) => ({
    type: REMOVE_FROM_SEARCH_RESULT,
    payload: id,
});

export const favoriteSearchResult = (id) => ({
    type: FAVORITE_SEARCH_RESULT,
    payload: id,
});

export const unFavoriteSearchResult = (id) => ({
    type: UNFAVORITE_SEARCH_RESULT,
    payload: id,
});
