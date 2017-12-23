import {
    POPULATE_DASHBOARD,
    START_LOADING,
    END_LOADING,
    OPEN_MOBILE_NAV,
    CLOSE_MOBILE_NAV
} from './actions';

const reducerMap = {
    [POPULATE_DASHBOARD]: (state, action) => ({ ...state, library: action.payload }),
    [START_LOADING]: (state) => ({ ...state, isLoaded: false }),
    [END_LOADING]: (state) => ({ ...state, isLoaded: true }),
    [OPEN_MOBILE_NAV]: (state) => ({ ...state, mobileNavIsOpen: true }),
    [CLOSE_MOBILE_NAV]: (state) => ({ ...state, mobileNavIsOpen: false }),
};

function dashboardReducer(state = {}, action) {
    if (reducerMap[action.type]) {
        return reducerMap[action.type](state, action);
    }

    return state;
}

export default dashboardReducer;
