import {
    POPULATE_DASHBOARD,
    START_LOADING,
    END_LOADING
} from './constants';

const actions = {
    [POPULATE_DASHBOARD]: (state, action) => ({ ...state, library: action.payload }),
    [START_LOADING]: (state) => ({ ...state, isLoaded: false }),
    [END_LOADING]: (state) => ({ ...state, isLoaded: true }),
};

function dashboardReducer(state = {}, action) {
    if (actions[action.type]) {
        return actions[action.type](state, action);
    }

    return state;
}

export default dashboardReducer;
