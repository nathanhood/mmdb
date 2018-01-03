import { schema } from 'normalizr';
import { MOVIES_STATE_KEY } from './constants';


export const movie = new schema.Entity(MOVIES_STATE_KEY);

export default {
    [MOVIES_STATE_KEY]: movie,
};
