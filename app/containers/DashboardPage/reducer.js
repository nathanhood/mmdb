import {
    POPULATE_DASHBOARD,
    START_LOADING,
    END_LOADING
} from './actions';

const reducerMap = {
    [POPULATE_DASHBOARD]: (state, action) => ({ ...state, library: action.payload }),
    [START_LOADING]: (state) => ({ ...state, isLoaded: false }),
    [END_LOADING]: (state) => ({ ...state, isLoaded: true }),
};

function dashboardReducer(state = {}, action) {
    if (reducerMap[action.type]) {
        return reducerMap[action.type](state, action);
    }

    return state;
}

export default dashboardReducer;
