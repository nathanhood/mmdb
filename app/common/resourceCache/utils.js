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
const _getRecentResourceKey = () => LIBRARY_RECENT_RESOURCE_KEY;

export const mapLocationToResource = ({ search }) => {
    const { genre, page } = queryString.parse(search);
    let gateway = () => getRecentUserMovies(page);
    let resourceKey = _getRecentResourceKey();
    const pagination = page || 1;

    if (genre) {
        gateway = () => getUserMoviesByGenre(genre, page);
        resourceKey = _getGenreResourceKey(genre);
    }

    return { gateway, resourceKey, pagination };
};

export const getLibraryGenreKeysFromMovie = (genres) => genres.map(({ slug }) => _getGenreResourceKey(slug));
