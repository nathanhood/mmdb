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
import { getLibraryGenreKeysFromMovie } from '../../common/resourceCache/utils';
import { markDashboardDirty } from '../../common/resourceCache/actions';
import { MOVIES_STATE_KEY } from '../../common/entities/constants';
import { addMoviesFromAPI } from '../../common/entities/actions';

export const prepareSearchResults = (query, searchType) => (dispatch, getState) => {
    const state = getState();
    const isLibrarySearch = searchType === LIBRARY_SEARCH_TYPE;
    const getResults = isLibrarySearch ?
        getMovieLibrarySearchResults :
        getMovieSearchResults;

    getResults(query).then((results) => {
        if (isLibrarySearch) {
            const newEntities = results.payload.filter((result) => !state.entities[MOVIES_STATE_KEY][result.id]);

            if (newEntities.length) {
                dispatch(addMoviesFromAPI({ payload: newEntities }));
            }
        }

        dispatch(populateSearchResults(results.payload));
        dispatch(showSearchResults());
    });
};

export const addMovieToLibrary = ({ id, format, definition, platform }) => (dispatch) => {
    dispatch(claimSearchResultAsOwned(id));

    addMovieToUserLibrary({ id, format, definition, platform }).then((movie) => {
        dispatch(setIdOnSearchResult(movie));
        dispatch(prepareRecentFormats(true));
    }).catch(() => {
        // TODO: unclaim search result and notify user that something went wrong
    });
};

export const removeMovieFromLibrary = (movie) => (dispatch) => {
    const { id, genres } = movie;

    dispatch(unclaimSearchResultAsOwned(id));
    dispatch(markDashboardDirty(getLibraryGenreKeysFromMovie(genres)));

    removeMovieFromUserLibrary(id).catch(() => {
        // TODO: unclaim search result and notify user that something went wrong
    });
};

export const favoriteMovie = (movie) => (dispatch) => {
    dispatch(favoriteSearchResult(movie.id));
    dispatch(markDashboardDirty(getLibraryGenreKeysFromMovie(movie.Genres)));

    return favoriteUserMovie(movie.id)
        .catch(() => {
            // TODO: unfavorite movie and notify user that something went wrong
        });
};

export const unFavoriteMovie = (movie) => (dispatch) => {
    dispatch(unFavoriteSearchResult(movie.id));
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
