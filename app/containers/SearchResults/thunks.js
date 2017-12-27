import {
    populateSearchResults,
    showSearchResults,
    claimSearchResultAsOwned,
    unclaimSearchResultAsOwned,
    setIdOnSearchResult
} from './actions';
import {
    getMovieSearchResults,
    addMovieToUserLibrary,
    removeMovieFromUserLibrary,
    getMovieLibrarySearchResults
} from '../../gateways/movies';
import { prepareRecentFormats } from '../App/thunks';
import { LIBRARY_SEARCH_TYPE } from './constants';

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

export const removeMovieFromLibrary = (id) => (dispatch) => {
    dispatch(unclaimSearchResultAsOwned(id));

    removeMovieFromUserLibrary(id).catch(() => {
        // TODO: unclaim search result and notify user that something went wrong
    });
};
