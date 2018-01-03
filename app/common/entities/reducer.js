import { combineReducers } from 'redux';
import movies from './modules/movies';
import { MOVIES_STATE_KEY } from './constants';

const reducer = combineReducers({
    [MOVIES_STATE_KEY]: movies,
});

export default reducer;
