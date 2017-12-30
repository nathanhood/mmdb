import {
    SHOW_SEARCH,
    HIDE_SEARCH,
    POPULATE_SEARCH_RESULTS,
    SHOW_SEARCH_RESULTS,
    CLAIM_SEARCH_RESULT_AS_OWNED,
    UNCLAIM_SEARCH_RESULT_AS_OWNED,
    SET_ID_ON_SEARCH_RESULT,
    REMOVE_FROM_SEARCH_RESULT,
    FAVORITE_SEARCH_RESULT,
    UNFAVORITE_SEARCH_RESULT
} from './actions';

const reducerMap = {
    [SHOW_SEARCH]: (state, { payload: type }) => ({
        ...state,
        isVisible: true,
        searchType: type,
    }),
    [HIDE_SEARCH]: (state) => ({
        ...state,
        isVisible: false,
        resultsAreVisible: false,
    }),
    [SHOW_SEARCH_RESULTS]: (state) => ({
        ...state,
        resultsAreVisible: true,
    }),
    [POPULATE_SEARCH_RESULTS]: (state, { payload: results }) => ({
        ...state,
        results,
    }),
    [CLAIM_SEARCH_RESULT_AS_OWNED]: (state, { payload: id }) => ({
        ...state,
        results: state.results.map((result) => ({
            ...result,
            isOwned: result.isOwned || result.tmdbId === id,
        })),
    }),
    [UNCLAIM_SEARCH_RESULT_AS_OWNED]: (state, { payload: id }) => ({
        ...state,
        results: state.results.map((result) => ({
            ...result,
            isOwned: result.id === id ? false : result.isOwned,
        })),
    }),
    [SET_ID_ON_SEARCH_RESULT]: (state, { payload: updatedResult }) => ({
        ...state,
        results: state.results.map((result) => {
            if (result.apiId === updatedResult.apiId) {
                return { ...result, id: updatedResult.id };
            }

            return result;
        }),
    }),
    [REMOVE_FROM_SEARCH_RESULT]: (state, { payload: id }) => ({
        ...state,
        results: state.results.filter((result) => result.id !== id),
    }),
    [FAVORITE_SEARCH_RESULT]: (state, { payload: id }) => ({
        ...state,
        results: state.results.map((item) => ({
            ...item,
            isFavorite: item.isFavorite || item.id === id,
        })),
    }),
    [UNFAVORITE_SEARCH_RESULT]: (state, { payload: id }) => ({
        ...state,
        results: state.results.map((item) => ({
            ...item,
            isFavorite: item.id === id ? false : item.isFavorite,
        })),
    }),
};

const searchReducer = (state = {}, action) => {
    if (reducerMap[action.type]) {
        return reducerMap[action.type](state, action);
    }

    return state;
};

export default searchReducer;
