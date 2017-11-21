/*
 *
 * App reducer
 *
 */
/* eslint-disable no-unused-vars */
import {
    SHOW_SEARCH,
    HIDE_SEARCH
} from './constants';

const actions = {
    [SHOW_SEARCH]: (state, { payload: { type } }) => ({
        ...state,
        searchIsVisible: true,
        searchType: type,
    }),
    [HIDE_SEARCH]: (state) => ({
        ...state,
        searchIsVisible: false,
    }),
};

function appReducer(state = {}, action) {
    if (actions[action.type]) {
        return actions[action.type](state, action);
    }

    return state;
}

export default appReducer;
