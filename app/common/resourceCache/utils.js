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

const _getGenreResourceKey = (genre) => `${LIBRARY_RESOURCE_KEY_PREFIX}${toPascalCaseFromKebabCase(genre)}Genre`;

export const mapLocationToResource = ({ search }) => {
    const { genre } = queryString.parse(search);
    let gateway = getRecentUserMovies;
    let resourceKey = LIBRARY_RECENT_RESOURCE_KEY;

    if (genre) {
        gateway = () => getUserMoviesByGenre(genre);
        resourceKey = _getGenreResourceKey(genre);
    }

    return { gateway, resourceKey };
};

export const getGenreKeysFromMovie = (genres) => genres.map(({ slug }) => _getGenreResourceKey(slug));
