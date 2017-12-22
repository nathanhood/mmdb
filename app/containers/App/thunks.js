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
import { prepareResource } from '../../utils/resourceCache';
import { RECENT_FORMATS_RESOURCE_KEY } from '../../common/resourceCache/constants';
import _uniqBy from 'lodash/uniqBy';

export const prepareSearchResults = (query) => (dispatch) => {
    dispatch(startLoading());

    getMovieSearchResults(query).then((results) => {
        dispatch(populateSearchResults(results.payload));
        dispatch(showSearchResults());
        dispatch(endLoading());
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

export const prepareRecentFormats = (forceUpdate) => (dispatch, getState) => {
    const state = getState();
    const formats = state.app.formats.movie;

    dispatch(prepareResource(RECENT_FORMATS_RESOURCE_KEY, getRecentMovieFormats, forceUpdate))
        .then((result) => {
            const recentFormats = _uniqBy(
                result.map((format) => {
                    return formats.find((f) => f.value === format)
                }).concat(formats),
                'value'
            ).slice(0, 3);

            dispatch(populateRecentFormats(recentFormats));
        });
};
