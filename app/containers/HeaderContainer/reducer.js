/*
 *
 * HeaderContainer reducer
 *
 */

import {
    SEARCH_VISIBILITY,
} from './constants';

const initialState = {};

function headerContainerReducer(state = initialState, action) {
    switch (action.type) {
        case SEARCH_VISIBILITY:
            return state;
        default:
            return state;
    }
}

export default headerContainerReducer;
