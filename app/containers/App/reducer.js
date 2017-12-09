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
    HIDE_SEARCH_RESULTS,
    CLAIM_SEARCH_RESULT_AS_OWNED,
    UNCLAIM_SEARCH_RESULT_AS_OWNED,
    SET_ID_ON_SEARCH_RESULT,
    POPULATE_RECENT_FORMATS
} from './constants';
import { log } from 'util';

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
    [CLAIM_SEARCH_RESULT_AS_OWNED]: (state, { payload: id }) => ({
        ...state,
        searchResults: state.searchResults.map((result) => ({
            ...result,
            isOwned: result.isOwned || result.tmdbId === id,
        })),
    }),
    [UNCLAIM_SEARCH_RESULT_AS_OWNED]: (state, { payload: id }) => ({
        ...state,
        searchResults: state.searchResults.map((result) => ({
            ...result,
            isOwned: result.id === id ? false : result.isOwned,
        })),
    }),
    [SET_ID_ON_SEARCH_RESULT]: (state, { payload: updatedResult }) => ({
        ...state,
        searchResults: state.searchResults.map((result) => {
            if (result.apiId === updatedResult.apiId) {
                return { ...result, id: updatedResult.id };
            }

            return result;
        }),
    }),
    [POPULATE_RECENT_FORMATS]: (state, { payload: recentFormats }) => ({
        ...state,
        recentFormats,
    }),
};

function appReducer(state = {}, action) {
    if (actions[action.type]) {
        return actions[action.type](state, action);
    }

    return state;
}

export default appReducer;
