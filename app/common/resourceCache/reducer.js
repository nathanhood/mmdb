import {
    SET_RESOURCE,
    MARK_DASHBOARD_DIRTY
} from './actions';

const markAllDirty = (keys, state) => {
    const dirty = {};

    keys.forEach((key) => {
        dirty[key] = { ...state[key], dirty: true };
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
        default:
            return state;
    }
};

export default resourceReducer;
