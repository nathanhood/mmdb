import {
    SHOW_SEARCH,
    HIDE_SEARCH,
} from './constants';

export function showSearch(type) {
    return {
        type: SHOW_SEARCH,
        payload: { type },
    };
}

export function hideSearch() {
    return {
        type: HIDE_SEARCH,
    };
}
