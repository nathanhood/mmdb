/*
 *
 * App reducer
 *
 */
/* eslint-disable no-unused-vars */
import {
    TOGGLE_SEARCH_VISIBILITY,
} from './constants';

const actions = {
    [TOGGLE_SEARCH_VISIBILITY]: (state) => ({ ...state, showSearch: !state.showSearch }),
};

function appReducer(state = {}, action) {
    if (actions[action.type]) {
        return actions[action.type](state, action);
    }

    return state;
}

export default appReducer;
