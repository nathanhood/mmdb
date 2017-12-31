import { push } from 'react-router-redux';
import queryString from 'query-string';
import {
    favoriteUserMovie,
    unFavoriteUserMovie,
    getUserMovieGenres,
    removeMovieFromUserLibrary
} from '../../gateways/movies';
import { prepareResource } from '../../common/resourceCache/thunks';
import {
    populateLibrary,
    favoriteLibraryItem,
    unFavoriteLibraryItem,
    populateSubMenuWithMovieGenres,
    removeLibraryItem,
    appendToLibrary,
    setPaginationType,
    prependToLibrary
} from './actions';
import {
    PAGINATION_PREPEND,
    PAGINATION_APPEND
} from './constants';
import {
    mapLocationToResource,
    getLibraryGenreKeysFromMovie
} from '../../common/resourceCache/utils';
import { DASHBOARD_URL } from '../../common/constants';
import { LIBRARY_MOVIE_GENRES_KEY } from '../../common/resourceCache/constants';
import { toLinkObjects } from '../../transformers/genres';
import { markDashboardDirty } from '../../common/resourceCache/actions';


export const prepareMoviesForDashboard = (
    location = { pathname: DASHBOARD_URL, search: '' },
    initial = false
) => (dispatch, getState) => {
    const { dashboard: { paginationType } } = getState();
    const { resourceKey, gateway, pagination } = mapLocationToResource(location);

    return dispatch(prepareResource(resourceKey, gateway, false, pagination))
        .then(({ payload, page, totalPages }) => {
            if (initial) {
                return dispatch(populateLibrary({ payload, page, totalPages }));
            }

            if (paginationType === PAGINATION_PREPEND) {
                return dispatch(prependToLibrary(payload));
            }

            return dispatch(appendToLibrary(payload));
        });
};

export const appendMoviesToLibrary = (location) => (dispatch, getState) => {
    const { dashboard: { libraryTotalPages } } = getState();
    const { pathname, search } = location;
    const query = queryString.parse(search);

    if (query.page >= libraryTotalPages) {
        return Promise.resolve();
    }

    const page = query.page ? parseInt(query.page) + 1 : 2;
    const newLocation = {
        pathname,
        search: queryString.stringify({ ...query, page }),
    };
    const { resourceKey, gateway, pagination } = mapLocationToResource(newLocation);

    return dispatch(prepareResource(resourceKey, gateway, false, pagination))
        .then(() => {
            dispatch(setPaginationType(PAGINATION_APPEND));
            dispatch(push(newLocation));
        });
};

export const prependMoviesToLibrary = (location) => (dispatch) => {
    const { pathname, search } = location;
    const query = queryString.parse(search);

    // TODO: Need page range to accurately track top and bottom
    // TODO: When prepending, need to set scroll value
    // TODO: Need to fix collapsed background container when no movies
    if (query.page <= 1) {
        return Promise.resolve();
    }

    const page = query.page ? parseInt(query.page) - 1 : 1;
    const newLocation = {
        pathname,
        search: queryString.stringify({ ...query, page }),
    };
    const { resourceKey, gateway, pagination } = mapLocationToResource(newLocation);

    return dispatch(prepareResource(resourceKey, gateway, false, pagination))
        .then(() => {
            dispatch(setPaginationType(PAGINATION_PREPEND));
            dispatch(push(newLocation));
        });
};

export const favoriteMovie = (movie) => (dispatch) => {
    dispatch(favoriteLibraryItem(movie.id));
    dispatch(markDashboardDirty(getLibraryGenreKeysFromMovie(movie.Genres)));

    return favoriteUserMovie(movie.id)
        .catch(() => {
            // TODO: unfavorite movie and notify user that something went wrong
        });
};

export const unFavoriteMovie = (movie) => (dispatch) => {
    dispatch(unFavoriteLibraryItem(movie.id));
    dispatch(markDashboardDirty(getLibraryGenreKeysFromMovie(movie.Genres)));

    return unFavoriteUserMovie(movie.id)
        .catch(() => {
            // TODO: unfavorite movie and notify user that something went wrong
        });
};

export const toggleFavorite = (movie) => (dispatch) => {
    const { isFavorite } = movie;

    if (isFavorite) {
        return dispatch(unFavoriteMovie(movie))
    }

    return dispatch(favoriteMovie(movie));
};

export const prepareMovieGenres = (forceUpdate) => (dispatch) => {
    return dispatch(prepareResource(LIBRARY_MOVIE_GENRES_KEY, getUserMovieGenres, forceUpdate))
        .then(({ payload }) => {
            const genres = toLinkObjects(payload).map((genre) => ({
                ...genre,
                url: `${DASHBOARD_URL}?genre=${genre.url}`,
            }));

            dispatch(populateSubMenuWithMovieGenres(genres));
        });
};

export const removeFromLibrary = (movie) => (dispatch) => {
    dispatch(removeLibraryItem(movie.id));
    dispatch(markDashboardDirty(getLibraryGenreKeysFromMovie(movie.Genres)));

    removeMovieFromUserLibrary(movie.id).catch(() => {
        // TODO: unclaim search result and notify user that something went wrong
    });
};
