import { getMovies } from '../../gateways/movies';
import {
    populateDashboard,
    startLoading,
    endLoading
} from './actions';

export const prepareMoviesForDashboard = () => (dispatch) => {
    dispatch(startLoading());

    getMovies('DESC').then((results) => {
        dispatch(populateDashboard(results.payload));
        dispatch(endLoading());
    });
};
