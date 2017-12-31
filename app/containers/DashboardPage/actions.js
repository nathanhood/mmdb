export const POPULATE_LIBRARY = 'dashboard/POPULATE_LIBRARY';
export const START_LOADING = 'dashboard/START_LOADING';
export const END_LOADING = 'dashboard/END_LOADING';
export const OPEN_MOBILE_NAV = 'dashboard/OPEN_MOBILE_NAV';
export const CLOSE_MOBILE_NAV = 'dashboard/CLOSE_MOBILE_NAV';
export const RESET_DASHBOARD = 'dashboard/RESET_DASHBOARD';
export const FAVORITE_LIBRARY_ITEM = 'dashboard/FAVORITE_LIBRARY_ITEM';
export const UNFAVORITE_LIBRARY_ITEM = 'dashboard/UNFAVORITE_LIBRARY_ITEM';
export const POPULATE_SUB_MENU_WITH_MOVIE_GENRES = 'dashboard/POPULATE_SUB_MENU_WITH_MOVIE_GENRES';
export const REMOVE_LIBRARY_ITEM = 'dashboard/REMOVE_LIBRARY_ITEM';
export const APPEND_TO_LIBRARY = 'dashboard/APPEND_TO_LIBRARY';
export const PREPEND_TO_LIBRARY = 'dashboard/PREPEND_TO_LIBRARY';
export const PAGINATION_SET_TYPE = 'dashboard/SET_PAGINATION_TYPE';
export const PAGINATION_MAX_REACHED = 'dashboard/PAGINATION_MAX_REACHED';


export const populateLibrary = ({ payload: library, page, totalPages }) => ({
    type: POPULATE_LIBRARY,
    payload: {
        library,
        page,
        totalPages,
    },
});

export const resetDashboard = () => ({
    type: RESET_DASHBOARD,
});

export const startLoading = () => ({
    type: START_LOADING,
});

export const endLoading = () => ({
    type: END_LOADING,
});

export const openMobileNav = () => ({
    type: OPEN_MOBILE_NAV,
});

export const closeMobileNav = () => ({
    type: CLOSE_MOBILE_NAV,
});

export const favoriteLibraryItem = (id) => ({
    type: FAVORITE_LIBRARY_ITEM,
    payload: id,
});

export const unFavoriteLibraryItem = (id) => ({
    type: UNFAVORITE_LIBRARY_ITEM,
    payload: id,
});

export const populateSubMenuWithMovieGenres = (genres) => ({
    type: POPULATE_SUB_MENU_WITH_MOVIE_GENRES,
    payload: genres,
});

export const removeLibraryItem = (id) => ({
    type: REMOVE_LIBRARY_ITEM,
    payload: id,
});

export const appendToLibrary = (list) => ({
    type: APPEND_TO_LIBRARY,
    payload: list,
});

export const prependToLibrary = (list) => ({
    type: PREPEND_TO_LIBRARY,
    payload: list,
});

export const setPaginationType = (type) => ({
    type: PAGINATION_SET_TYPE,
    payload: type,
});

export const maxPaginationReached = () => ({
    type: PAGINATION_MAX_REACHED,
});
