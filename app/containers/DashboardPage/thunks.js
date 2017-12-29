import {
    favoriteUserMovie,
    unFavoriteUserMovie,
    getUserMovieGenres
} from '../../gateways/movies';
import { prepareResource } from '../../utils/resourceCache';
import {
    populateDashboard,
    favoriteLibraryItem,
    unFavoriteLibraryItem,
    populateSubMenuWithMovieGenres
} from './actions';
import { mapLocationToResource } from '../../common/resourceCache/utils';
import { DASHBOARD_URL } from '../../common/constants';
import { LIBRARY_MOVIE_GENRES_KEY } from '../../common/resourceCache/constants';
import { toLinkObjects } from '../../transformers/genres';

export const prepareMoviesForDashboard = (location = { pathname: DASHBOARD_URL, search: '' }, forceUpdate = false) => (dispatch) => {
    const { resourceKey, gateway } = mapLocationToResource(location);

    return dispatch(prepareResource(resourceKey, gateway, forceUpdate))
        .then((results) => {
            dispatch(populateDashboard(results.payload));
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
