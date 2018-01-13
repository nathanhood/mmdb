import { platform as platformSchema } from '../schema';
import { denormalize } from 'normalizr';
import { PLATFORM_STATE_KEY } from '../constants';
import { copyAndAddToState } from '../utils';


export const ADD_PLATFORMS = 'entities/ADD_PLATFORMS';

export default (state = {}, action) => {
    switch (action.type) {
        case ADD_PLATFORMS:
            return copyAndAddToState(action.payload.entities[PLATFORM_STATE_KEY], state);
        default:
            return state;
    }
};

export const addPlatforms = (payload) => ({
    type: ADD_PLATFORMS,
    payload,
});

export const selectHydrated = (state, id) => denormalize(id, platformSchema, state);
