import {
    POPULATE_DASHBOARD,
    START_LOADING,
    END_LOADING
} from './constants';

export const populateDashboard = (list) => ({
    type: POPULATE_DASHBOARD,
    payload: list,
});

export const startLoading = () => ({
    type: START_LOADING,
});

export const endLoading = () => ({
    type: END_LOADING,
});
