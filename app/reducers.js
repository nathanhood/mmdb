/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { LOCATION_CHANGE } from 'react-router-redux';

import appReducer from './containers/App/reducer';
import dashboardReducer from './containers/DashboardPage/reducer';
import resourceReducer from './common/resourceCache/reducer';
import authReducer from './common/auth/reducer';
import searchReducer from './containers/SearchResults/reducer';
import entityReducer from './common/entities/reducer';

/*
 * routeReducer
 *
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@4
 *
 */

// Initial routing state
const routeInitialState = {
    location: null,
};

/**
 * Merge route into the global application state
 */
function routeReducer(state = routeInitialState, action) {
    switch (action.type) {
        /* istanbul ignore next */
        case LOCATION_CHANGE:
            return {
                ...state,
                location: { ...action.payload },
            };
        default:
            return state;
    }
}

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(injectedReducers) {
    return combineReducers({
        route: routeReducer,
        app: appReducer,
        dashboard: dashboardReducer,
        resourceCache: resourceReducer,
        auth: authReducer,
        search: searchReducer,
        entities: entityReducer,
        ...injectedReducers,
    });
}
