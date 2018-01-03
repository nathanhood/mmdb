import {
    POPULATE_DASHBOARD,
    RESET_DASHBOARD,
    START_LOADING,
    END_LOADING,
    OPEN_MOBILE_NAV,
    CLOSE_MOBILE_NAV,
    FAVORITE_LIBRARY_ITEM,
    UNFAVORITE_LIBRARY_ITEM,
    POPULATE_SUB_MENU_WITH_MOVIE_GENRES,
    REMOVE_LIBRARY_ITEM
} from './actions';
import { ADD_MOVIES } from '../../common/entities/actions';
import initialState from '../../initialState';
import { SUB_MENU_BASE } from './constants';
import { paginateEntity } from '../../common/entities/pagination';

const reducerMap = {
    [ADD_MOVIES]: (state, { payload }) => {
        const activeResource = payload.meta.resourceName;

        return {
            ...state,
            activeResource,
            [activeResource]: paginateEntity(payload, state[activeResource]),
        };
    },
    [POPULATE_DASHBOARD]: (state, action) => ({ ...state, library: action.payload }),
    [RESET_DASHBOARD]: () => ({ ...initialState.dashboard }),
    [START_LOADING]: (state) => ({ ...state, isLoaded: false }),
    [END_LOADING]: (state) => ({ ...state, isLoaded: true }),
    [OPEN_MOBILE_NAV]: (state) => ({ ...state, mobileNavIsOpen: true }),
    [CLOSE_MOBILE_NAV]: (state) => ({ ...state, mobileNavIsOpen: false }),
    [FAVORITE_LIBRARY_ITEM]: (state, { payload: id }) => ({
        ...state,
        library: state.library.map((item) => ({
            ...item,
            isFavorite: item.isFavorite || item.id === id,
        })),
    }),
    [UNFAVORITE_LIBRARY_ITEM]: (state, { payload: id }) => ({
        ...state,
        library: state.library.map((item) => ({
            ...item,
            isFavorite: item.id === id ? false : item.isFavorite,
        })),
    }),
    [POPULATE_SUB_MENU_WITH_MOVIE_GENRES]: (state, { payload: genres }) => ({
        ...state,
        subMenu: SUB_MENU_BASE.concat(genres),
    }),
    [REMOVE_LIBRARY_ITEM]: (state, { payload: id }) => ({
        ...state,
        library: state.library.filter((item) => item.id !== id),
    }),
};

function dashboardReducer(state = {}, action) {
    if (reducerMap[action.type]) {
        return reducerMap[action.type](state, action);
    }

    return state;
}

export default dashboardReducer;
