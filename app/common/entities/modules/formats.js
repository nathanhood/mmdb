import { format as formatSchema } from '../schema';
import {
    denormalize,
    normalize
} from 'normalizr';
import { getUserFormats } from '../../../gateways/formats';
import { FORMAT_STATE_KEY } from '../constants';
import {
    combineResponse,
    copyAndAddToState
} from '../utils';
import {
    addDefinitions,
    addPlatforms
} from '../actions';


export const ADD_FORMATS = 'entities/ADD_FORMATS';

export default (state = {}, action) => {
    switch (action.type) {
        case ADD_FORMATS:
            return copyAndAddToState(action.payload.entities[FORMAT_STATE_KEY], state);
        default:
            return state;
    }
}

export const addFormats = (payload) => ({
    type: ADD_FORMATS,
    payload,
});

export const getFormats = () => (dispatch, getState, schema) => {
    return getUserFormats()
        .then((results) => {
            const normalizedData = normalize(results.payload, [schema[FORMAT_STATE_KEY]]);
            const formats = combineResponse(results, normalizedData, {})

            dispatch(addFormats(formats));
            dispatch(addDefinitions(formats));
            dispatch(addPlatforms(formats));

            return formats;
        });
}

export const selectHydrated = (state, id) => denormalize(id, formatSchema, state);
