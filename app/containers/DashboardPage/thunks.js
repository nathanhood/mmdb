import {
    getRecentUserMovies,
    favoriteUserMovie,
    unFavoriteUserMovie
} from '../../gateways/movies';
import { prepareResource } from '../../utils/resourceCache';
import {
    populateDashboard,
    startLoading,
    endLoading,
    favoriteLibraryItem,
    unFavoriteLibraryItem
} from './actions';
import { LIBRARY_RECENT_RESOURCE_KEY } from '../../common/resourceCache/constants';

export const prepareMoviesForDashboard = (forceUpdate) => (dispatch) => {
    dispatch(startLoading());

    return dispatch(prepareResource(LIBRARY_RECENT_RESOURCE_KEY, getRecentUserMovies, forceUpdate))
        .then((results) => {
            dispatch(populateDashboard(results.payload));
            dispatch(endLoading());
        });
};

export const favoriteMovie = (movieId) => (dispatch) => {
    dispatch(favoriteLibraryItem(movieId));

    return favoriteUserMovie(movieId)
        .catch(() => {
            // TODO: unfavorite movie and notify user that something went wrong
        });
};

export const unFavoriteMovie = (movieId) => (dispatch) => {
    dispatch(unFavoriteLibraryItem(movieId));

    return unFavoriteUserMovie(movieId)
        .catch(() => {
            // TODO: unfavorite movie and notify user that something went wrong
        });
};
