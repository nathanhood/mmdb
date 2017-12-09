import {
    startLoading,
    endLoading,
    populateSearchResults,
    showSearchResults,
    claimSearchResultAsOwned,
    unclaimSearchResultAsOwned,
    setIdOnSearchResult,
    populateRecentFormats
} from './actions';
import {
    getMovieSearchResults,
    addMovieToUserLibrary,
    removeMovieFromUserLibrary,
    getRecentMovieFormats,
} from '../../gateways/movies';

export const prepareSearchResults = (query) => (dispatch) => {
    dispatch(startLoading());

    getMovieSearchResults(query).then((results) => {
        dispatch(populateSearchResults(results.payload));
        dispatch(showSearchResults());
        dispatch(endLoading());
    });
};

export const addMovieToLibrary = ({ id, format }) => (dispatch) => {
    dispatch(claimSearchResultAsOwned(id));

    addMovieToUserLibrary({ id, format }).then((movie) => {
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

export const prepareRecentFormats = () => (dispatch, getState) => {
    const state = getState();
    const formats = state.app.formats.movie;

    getRecentMovieFormats().then((result) => {
        const recentFormats = result.map((format) => formats.find((f) => f.value === format));

        while (recentFormats.length < 3) {
            recentFormats.push(formats.find((f) => !result.includes(f.value)));
        }

        dispatch(populateRecentFormats(recentFormats));
    });
};
