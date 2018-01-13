import { definition as definitionSchema } from '../schema';
import { denormalize } from 'normalizr';
import { DEFINITION_STATE_KEY } from '../constants';
import { copyAndAddToState } from '../utils';


export const ADD_DEFINITIONS = 'entities/ADD_DEFINITIONS';

export default (state = {}, action) => {
    switch (action.type) {
        case ADD_DEFINITIONS:
            return copyAndAddToState(action.payload.entities[DEFINITION_STATE_KEY], state);
        default:
            return state;
    }
};

export const addDefinitions = (payload) => ({
    type: ADD_DEFINITIONS,
    payload,
});

export const selectHydrated = (state, id) => denormalize(id, definitionSchema, state);
