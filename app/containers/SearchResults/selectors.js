import { selectMovie } from '../../common/entities/selectors';
import { LIBRARY_SEARCH_TYPE } from './constants';

export const selectSearchResults = ({
    search,
    entities
}) => {
    const results = search.results;

    if (!results) {
        return null;
    }

    // Leave results alone if not searching users library
    // External search doesn't return same data
    if (search.searchType !== LIBRARY_SEARCH_TYPE) {
        return results;
    }

    return results.map((result) => selectMovie(entities, result.id));
}
