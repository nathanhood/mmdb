/*
 *
 * HeaderContainer actions
 *
 */

import {
    SEARCH_VISIBILITY,
} from './constants';

export function showHeader() {
    return {
        type: SEARCH_VISIBILITY,
    };
}
