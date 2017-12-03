import {
    startLoading,
    endLoading,
    populateSearchResults,
    showSearchResults,
    claimSearchResultAsOwned,
    unclaimSearchResultAsOwned,
    setIdOnSearchResult
} from './actions';
import {
    getMovieSearchResults,
    addMovieToUserLibrary,
    removeMovieFromUserLibrary
} from '../../gateways/movies';

export const prepareSearchResults = (query) => (dispatch) => {
    dispatch(startLoading());

    getMovieSearchResults(query).then((results) => {
        dispatch(populateSearchResults(results.payload));
        dispatch(showSearchResults());
        dispatch(endLoading());
    });
};

export const addMovieToLibrary = (id) => (dispatch) => {
    dispatch(claimSearchResultAsOwned(id));

    addMovieToUserLibrary(id).then((movie) => {
        dispatch(setIdOnSearchResult(movie));
    }).catch(() => {
        // TODO: unclaim search result and notify user that something went wrong
    });
};

export const removeMovieFromLibrary = (id) => (dispatch) => {
    dispatch(unclaimSearchResultAsOwned(id));

    removeMovieFromUserLibrary(id).catch(() => {
        // TODO: unclaim search result and notify user that something went wrong
    });
};
