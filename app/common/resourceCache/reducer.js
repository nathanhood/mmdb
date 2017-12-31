import {
    SET_RESOURCE,
    MARK_DASHBOARD_DIRTY,
    RESET_RESOURCE_CACHE
} from './actions';

const markAllDirty = (keys, state) => {
    const dirty = {};

    keys.forEach((key) => {
        if (state[key]) {
            dirty[key] = { ...state[key], dirty: true };
        }
    });

    return dirty;
};

const resourceReducer = (state = {}, action) => {
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
        case RESET_RESOURCE_CACHE:
            return {};
        default:
            return state;
    }
};

export default resourceReducer;
