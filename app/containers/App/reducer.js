/*
 *
 * App reducer
 *
 */
/* eslint-disable no-unused-vars */
import {
    SHOW_SEARCH,
    HIDE_SEARCH,
    POPULATE_SEARCH_RESULTS,
    SHOW_SEARCH_RESULTS,
    HIDE_SEARCH_RESULTS
} from './constants';

const actions = {
    [SHOW_SEARCH]: (state, { payload: type }) => ({
        ...state,
        searchIsVisible: true,
        searchType: type,
    }),
    [HIDE_SEARCH]: (state) => ({
        ...state,
        searchIsVisible: false,
        searchResultsAreVisible: false,
    }),
    [POPULATE_SEARCH_RESULTS]: (state, { payload: searchResults }) => ({
        ...state,
        searchResults,
    }),
    [SHOW_SEARCH_RESULTS]: (state) => ({
        ...state,
        searchResultsAreVisible: true,
    }),
};

function appReducer(state = {}, action) {
    if (actions[action.type]) {
        return actions[action.type](state, action);
    }

    return state;
}

export default appReducer;
