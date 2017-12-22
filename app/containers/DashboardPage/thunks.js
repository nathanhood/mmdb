import { getRecentUserMovies } from '../../gateways/movies';
import { prepareResource } from '../../utils/resourceCache';
import {
    populateDashboard,
    startLoading,
    endLoading
} from './actions';
import { LIBRARY_RECENT_RESOURCE_KEY } from '../../common/resourceCache/constants';

export const prepareMoviesForDashboard = (forceUpdate) => (dispatch) => {
    dispatch(startLoading());

    return dispatch(prepareResource(LIBRARY_RECENT_RESOURCE_KEY, getRecentUserMovies, forceUpdate))
        .then((results) => {
            dispatch(populateDashboard(results.payload));
            dispatch(endLoading());
        });
};
