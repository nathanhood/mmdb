import { LIBRARY_RECENT_RESOURCE_KEY } from './constants';

export const SET_RESOURCE = 'resource/SET_RESOURCE';
export const MARK_DASHBOARD_DIRTY = 'resource/MARK_DASHBOARD_DIRTY';
export const RESET_RESOURCE_CACHE = 'resource/RESET_RESOURCE_CACHE';

export const setResource = (key, resource) => ({
    type: SET_RESOURCE,
    payload: {
        key,
        resource,
    },
});

export const markDashboardDirty = (resourceKeys = []) => ({
    type: MARK_DASHBOARD_DIRTY,
    payload: [LIBRARY_RECENT_RESOURCE_KEY].concat(resourceKeys),
});

export const resetResourceCache = () => ({
    type: RESET_RESOURCE_CACHE,
});
