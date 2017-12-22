import {
    SET_RESOURCE,
    MARK_DASHBOARD_DIRTY,
    AUTH_SUCCESSFUL,
    AUTH_FAILURE
} from './actions';
import { getUser } from '../utils/localStorage';

const user = getUser();

const markAllDirty = (keys, state) => {
    const dirty = {};

    keys.forEach((key) => {
        dirty[key] = { ...state[key], dirty: true };
    });

    return dirty;
};

export const authReducer = (state = { user, isAuthenticated: user !== null }, action) => {
    switch (action.type) {
        case AUTH_SUCCESSFUL:
            return { ...state, isAuthenticated: true, user: action.payload };
        case AUTH_FAILURE:
            return { ...state, isAuthenticated: false, user: {} };
        default:
            return state;
    }
}

export const resourceReducer = (state = {}, action) => {
    switch (action.type) {
        case MARK_DASHBOARD_DIRTY:
            return {
                ...state,
                ...markAllDirty(action.payload, state),
            };
        case SET_RESOURCE:
            return {
                ...state,
                [action.payload.key]: action.payload.resource,
            };
        default:
            return state;
    }
}
