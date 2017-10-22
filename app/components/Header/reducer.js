import { SEARCH_VISIBILITY } from './constants';

export default (state, action) => {
    switch (action.type) {
        case SEARCH_VISIBILITY:
            return {
                ...state,
                showSearch: !state.showSearch,
            };
        default:
            return state;
    }
};
