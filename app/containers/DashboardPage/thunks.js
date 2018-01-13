import queryString from 'query-string';
import {
    favoriteUserMovie,
    unFavoriteUserMovie,
    getUserMovieGenres,
    removeMovieFromUserLibrary
} from '../../gateways/movies';
import { prepareResource } from '../../common/resourceCache/thunks';
import { populateSubMenuWithMovieGenres } from './actions';
import {
    getDashboardResourceName,
    getLibraryGenreKeysFromMovie
} from '../../common/resourceCache/utils';
import { DASHBOARD_URL } from '../../common/constants';
import { LIBRARY_MOVIE_GENRES_KEY } from '../../common/resourceCache/constants';
import { toLinkObjects } from '../../transformers/genres';
import { markDashboardDirty } from '../../common/resourceCache/actions';
import {
    getMovies,
    favoriteMovie,
    unFavoriteMovie,
    removeMovie,
    getFormats
} from '../../common/entities/actions';


const _createOptionsFromLocation = (location) => {
    const { genre, page } = queryString.parse(location.search);
    let options = { page };

    if (genre) {
        options = { ...options, genre };
    } else {
        options = { ...options, order: 'desc' };
    }

    return options;
};

export const prepareMoviesForDashboard = (location) => (dispatch) => {
    const options = _createOptionsFromLocation(location);
    // TODO: Rethink where getDashboardResourceName should live
    const resourceName = getDashboardResourceName(options.genre);

    return dispatch(getMovies(options, { resourceName }));
};

export const prepareFormatsForDashboard = () => (dispatch) => {
    return dispatch(getFormats());
};

export const favoriteDashboardMovie = (movie) => (dispatch) => {
    dispatch(favoriteMovie({ id: movie.id }));
    dispatch(markDashboardDirty(getLibraryGenreKeysFromMovie(movie.Genres)));

    return favoriteUserMovie(movie.id)
        .catch(() => {
            // TODO: unfavorite movie and notify user that something went wrong
        });
};

export const unFavoriteDashboardMovie = (movie) => (dispatch) => {
    dispatch(unFavoriteMovie({ id: movie.id }));
    dispatch(markDashboardDirty(getLibraryGenreKeysFromMovie(movie.Genres)));

    return unFavoriteUserMovie(movie.id)
        .catch(() => {
            // TODO: unfavorite movie and notify user that something went wrong
        });
};

export const toggleFavorite = (movie) => (dispatch) => {
    const { isFavorite } = movie;

    if (isFavorite) {
        return dispatch(unFavoriteDashboardMovie(movie))
    }

    return dispatch(favoriteDashboardMovie(movie));
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
    dispatch(removeMovie({ id: movie.id }));
    dispatch(markDashboardDirty(getLibraryGenreKeysFromMovie(movie.Genres)));

    removeMovieFromUserLibrary(movie.id).catch(() => {
        // TODO: unclaim search result and notify user that something went wrong
    });
};
