/*
 *
 * App reducer
 *
 */

import {
    TOGGLE_SEARCH_VISIBILITY,
} from './constants';

const initialState = {
    showSearch: false,
};

const actions = {
    TOGGLE_SEARCH_VISIBILITY: (state) => ({ ...state, showSearch: !state.showSearch }),
};

function appReducer(state = initialState, action) {
    if (actions[action.type]) {
        return actions[action.type](state);
    }

    return state;
}

export default appReducer;
