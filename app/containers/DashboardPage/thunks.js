import {
    favoriteUserMovie,
    unFavoriteUserMovie,
    getUserMovieGenres,
    removeMovieFromUserLibrary
} from '../../gateways/movies';
import { prepareResource } from '../../common/resourceCache/thunks';
import {
    populateDashboard,
    favoriteLibraryItem,
    unFavoriteLibraryItem,
    populateSubMenuWithMovieGenres,
    removeLibraryItem
} from './actions';
import {
    mapLocationToResource,
    getLibraryGenreKeysFromMovie
} from '../../common/resourceCache/utils';
import { DASHBOARD_URL } from '../../common/constants';
import { LIBRARY_MOVIE_GENRES_KEY } from '../../common/resourceCache/constants';
import { toLinkObjects } from '../../transformers/genres';
import { markDashboardDirty } from '../../common/resourceCache/actions';
import { getMovies } from '../../common/entities/actions';

export const prepareMoviesForDashboard = (
    location = { pathname: DASHBOARD_URL, search: '' }
) => (dispatch) => {
    const { resourceKey, pagination: page } = mapLocationToResource(location);

    // TODO: Finish this thunk to retrieve active resource
    // TODO: Set activeResource through SubMenuRoute / possibly set currentPage on the paginated resource as well
    return dispatch(getMovies({ order: 'desc', page }, { resourceName: resourceKey }))
        .then((results) => dispatch(populateDashboard(results.raw.payload)));
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
