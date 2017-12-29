import {
    getRecentUserMovies,
    getUserMoviesByGenre
} from '../../gateways/movies';
import {
    LIBRARY_RECENT_RESOURCE_KEY,
    LIBRARY_RESOURCE_KEY_PREFIX
} from './constants';
import queryString from 'query-string';
import { toPascalCaseFromKebabCase } from '../../utils/string';

export const mapLocationToResource = ({ search }) => {
    const { genre } = queryString.parse(search);
    let gateway = getRecentUserMovies;
    let resourceKey = LIBRARY_RECENT_RESOURCE_KEY;

    if (genre) {
        gateway = () => getUserMoviesByGenre(genre);
        resourceKey = `${LIBRARY_RESOURCE_KEY_PREFIX}${toPascalCaseFromKebabCase(genre)}Genre`;
    }

    return { gateway, resourceKey };
};
