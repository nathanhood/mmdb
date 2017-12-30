import {
    populateSearchResults,
    showSearchResults,
    claimSearchResultAsOwned,
    unclaimSearchResultAsOwned,
    setIdOnSearchResult,
    favoriteSearchResult,
    unFavoriteSearchResult
} from './actions';
import {
    getMovieSearchResults,
    addMovieToUserLibrary,
    removeMovieFromUserLibrary,
    getMovieLibrarySearchResults,
    favoriteUserMovie,
    unFavoriteUserMovie
} from '../../gateways/movies';
import { prepareRecentFormats } from '../App/thunks';
import { LIBRARY_SEARCH_TYPE } from './constants';
import { getGenreKeysFromMovie } from '../../common/resourceCache/utils';
import { markDashboardDirty } from '../../common/resourceCache/actions';

export const prepareSearchResults = (query, searchType) => (dispatch) => {
    const getResults = searchType === LIBRARY_SEARCH_TYPE ?
        getMovieLibrarySearchResults :
        getMovieSearchResults;

    getResults(query).then((results) => {
        dispatch(populateSearchResults(results.payload));
        dispatch(showSearchResults());
    });
};

export const addMovieToLibrary = ({ id, format, definition }) => (dispatch) => {
    dispatch(claimSearchResultAsOwned(id));

    addMovieToUserLibrary({ id, format, definition }).then((movie) => {
        dispatch(setIdOnSearchResult(movie));
        dispatch(prepareRecentFormats(true));
    }).catch(() => {
        // TODO: unclaim search result and notify user that something went wrong
    });
};

export const removeMovieFromLibrary = (movie) => (dispatch) => {
    const { id, Genres } = movie;

    dispatch(unclaimSearchResultAsOwned(id));
    dispatch(markDashboardDirty(getGenreKeysFromMovie(Genres)));

    removeMovieFromUserLibrary(id).catch(() => {
        // TODO: unclaim search result and notify user that something went wrong
    });
};

export const favoriteMovie = (movie) => (dispatch) => {
    dispatch(favoriteSearchResult(movie.id));
    dispatch(markDashboardDirty(getGenreKeysFromMovie(movie.Genres)));

    return favoriteUserMovie(movie.id)
        .catch(() => {
            // TODO: unfavorite movie and notify user that something went wrong
        });
};

export const unFavoriteMovie = (movie) => (dispatch) => {
    dispatch(unFavoriteSearchResult(movie.id));
    dispatch(markDashboardDirty(getGenreKeysFromMovie(movie.Genres)));

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
