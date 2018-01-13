import { combineReducers } from 'redux';
import movies from './modules/movies';
import formats from './modules/formats';
import definitions from './modules/definitions';
import platforms from './modules/platforms';
import {
    MOVIES_STATE_KEY,
    FORMAT_STATE_KEY,
    DEFINITION_STATE_KEY,
    PLATFORM_STATE_KEY
} from './constants';

const reducer = combineReducers({
    [MOVIES_STATE_KEY]: movies,
    [FORMAT_STATE_KEY]: formats,
    [DEFINITION_STATE_KEY]: definitions,
    [PLATFORM_STATE_KEY]: platforms,
});

export default reducer;
