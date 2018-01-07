import _isEmpty from 'lodash/isEmpty';
import {
    RESET_DASHBOARD,
    START_LOADING,
    END_LOADING,
    OPEN_MOBILE_NAV,
    CLOSE_MOBILE_NAV,
    POPULATE_SUB_MENU_WITH_MOVIE_GENRES
} from './actions';
import {
    ADD_MOVIES,
    REMOVE_MOVIE
} from '../../common/entities/actions';
import initialState from '../../initialState';
import { SUB_MENU_BASE } from './constants';
import {
    paginateEntity,
    removeFromPaginatedEntity
} from '../../common/entities/pagination';

const reducerMap = {
    [ADD_MOVIES]: (state, { payload }) => {
        const activeResource = payload.meta.resourceName;

        return {
            ...state,
            activeResource,
            [activeResource]: paginateEntity(payload, state[activeResource]),
        };
    },
    [REMOVE_MOVIE]: (state, { payload }) => {
        return Object.entries(state).reduce((mergedObj, [key, value]) => {
            return {
                ...mergedObj,
                [key]: typeof value === 'object' && !_isEmpty(value.pages) ?
                    removeFromPaginatedEntity(value, payload.id) :
                    value,
            }
        }, {});
    },
    [RESET_DASHBOARD]: () => ({ ...initialState.dashboard }),
    [START_LOADING]: (state) => ({ ...state, isLoaded: false }),
    [END_LOADING]: (state) => ({ ...state, isLoaded: true }),
    [OPEN_MOBILE_NAV]: (state) => ({ ...state, mobileNavIsOpen: true }),
    [CLOSE_MOBILE_NAV]: (state) => ({ ...state, mobileNavIsOpen: false }),
    [POPULATE_SUB_MENU_WITH_MOVIE_GENRES]: (state, { payload: genres }) => ({
        ...state,
        subMenu: SUB_MENU_BASE.concat(genres),
    }),
};

function dashboardReducer(state = {}, action) {
    if (reducerMap[action.type]) {
        return reducerMap[action.type](state, action);
    }

    return state;
}

export default dashboardReducer;
