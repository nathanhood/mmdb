import { SEARCH_VISIBILITY } from './constants';

export function toggleSearch() {
    return {
        type: SEARCH_VISIBILITY,
    };
}
