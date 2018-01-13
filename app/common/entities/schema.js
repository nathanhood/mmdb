import { schema } from 'normalizr';
import {
    MOVIES_STATE_KEY,
    DEFINITION_STATE_KEY,
    PLATFORM_STATE_KEY,
    FORMAT_STATE_KEY
} from './constants';


export const definition = new schema.Entity(DEFINITION_STATE_KEY, {}, {
    idAttribute: 'value',
});

export const platform = new schema.Entity(PLATFORM_STATE_KEY, {}, {
    idAttribute: 'value',
});

export const format = new schema.Entity(FORMAT_STATE_KEY, {
    platforms: [platform],
    definitions: [definition],
}, {
    idAttribute: 'value',
});

export const movie = new schema.Entity(MOVIES_STATE_KEY, {
    definition,
    platform,
    format,
});

export default {
    [MOVIES_STATE_KEY]: movie,
    [FORMAT_STATE_KEY]: format,
};
