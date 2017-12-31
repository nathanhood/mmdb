import {
    POPULATE_LIBRARY,
    RESET_DASHBOARD,
    START_LOADING,
    END_LOADING,
    OPEN_MOBILE_NAV,
    CLOSE_MOBILE_NAV,
    FAVORITE_LIBRARY_ITEM,
    UNFAVORITE_LIBRARY_ITEM,
    POPULATE_SUB_MENU_WITH_MOVIE_GENRES,
    REMOVE_LIBRARY_ITEM,
    APPEND_TO_LIBRARY,
    PREPEND_TO_LIBRARY,
    PAGINATION_SET_TYPE
} from './actions';
import initialState from '../../initialState';
import { SUB_MENU_BASE } from './constants';

const reducerMap = {
    [APPEND_TO_LIBRARY]: (state, { payload }) => ({
        ...state,
        library: state.library.concat(payload),
        libraryPage: state.library.page + 1,
    }),
    [PREPEND_TO_LIBRARY]: (state, { payload }) => ({
        ...state,
        library: payload.concat(state.library),
        libraryPage: state.library.page - 1,
    }),
    [POPULATE_LIBRARY]: (state, { payload }) => ({
        ...state,
        library: payload.library,
        libraryPage: payload.page,
        libraryTotalPages: payload.totalPages,
    }),
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
    [PAGINATION_SET_TYPE]: (state, { payload: paginationType }) => ({
        ...state,
        paginationType,
    }),
};

function dashboardReducer(state = {}, action) {
    if (reducerMap[action.type]) {
        return reducerMap[action.type](state, action);
    }

    return state;
}

export default dashboardReducer;
