/*
 *
 * App reducer
 *
 */
/* eslint-disable no-unused-vars */
import {
    HIDE_SEARCH_RESULTS,
    POPULATE_RECENT_FORMATS
} from './actions';
import { log } from 'util';

const reducerMap = {
    [POPULATE_RECENT_FORMATS]: (state, { payload: recentFormats }) => ({
        ...state,
        recentFormats,
    }),
};

function appReducer(state = {}, action) {
    if (reducerMap[action.type]) {
        return reducerMap[action.type](state, action);
    }

    return state;
}

export default appReducer;
