import { LIBRARY_RECENT_RESOURCE_KEY } from './constants';

export const SET_RESOURCE = 'resource/SET_RESOURCE';
export const MARK_DASHBOARD_DIRTY = 'resource/MARK_DASHBOARD_DIRTY';
export const AUTH_SUCCESSFUL = 'auth/AUTH_SUCCESSFUL';
export const AUTH_FAILURE = 'auth/AUTH_FAILURE';

export const setResource = (key, resource) => ({
    type: SET_RESOURCE,
    payload: {
        key,
        resource,
    },
});

export const markDashboardDirty = () => {
    return {
        type: MARK_DASHBOARD_DIRTY,
        payload: [LIBRARY_RECENT_RESOURCE_KEY],
    };
};

export const authSuccess = (user) => ({
    type: AUTH_SUCCESSFUL,
    payload: user,
});

export const authFailure = () => ({
    type: AUTH_FAILURE,
});
