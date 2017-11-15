import { getMovies } from 'gateways/movies';
import {
    populateDashboard,
    startLoading,
    endLoading
} from './actions';

export const prepareMoviesForDashboard = () => (dispatch) => {
    dispatch(startLoading());

    getMovies().then(({ data: results }) => {
        dispatch(populateDashboard(results));
        dispatch(endLoading());
    });
};
