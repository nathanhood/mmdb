import {
    startLoading,
    endLoading,
    populateSearchResults,
    showSearchResults,
    claimSearchResultAsOwned
} from './actions';
import {
    getMovieSearchResults,
    addMovieToUserLibrary
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

    addMovieToUserLibrary(id).catch(() => {
        // TODO: unclaim search result and notify user that something went wrong
    });
};
