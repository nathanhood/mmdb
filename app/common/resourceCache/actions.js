import { LIBRARY_RECENT_RESOURCE_KEY } from './constants';

export const SET_RESOURCE = 'resource/SET_RESOURCE';
export const MARK_DASHBOARD_DIRTY = 'resource/MARK_DASHBOARD_DIRTY';

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
