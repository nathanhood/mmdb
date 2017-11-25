import {
    startLoading,
    endLoading,
    populateSearchResults,
    showSearchResults
} from './actions';
import { getMovieSearchResults } from '../../gateways/movies';

export const prepareSearchResults = (query) => (dispatch) => {
    dispatch(startLoading());

    getMovieSearchResults(query).then((results) => {
        dispatch(populateSearchResults(results.payload));
        dispatch(showSearchResults());
        dispatch(endLoading());
    });
};
