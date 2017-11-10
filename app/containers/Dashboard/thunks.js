import { getLibrary } from 'gateways/library';
import {
    populateDashboard,
    startLoading,
    endLoading
} from './actions';

export const prepareLibraryForListing = () => (dispatch) => {
    dispatch(startLoading());

    getLibrary().then(({ data: results }) => {
        dispatch(populateDashboard(results));
        dispatch(endLoading());
    });
};
