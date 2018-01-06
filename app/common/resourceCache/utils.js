import {
    LIBRARY_RECENT_RESOURCE_KEY,
    LIBRARY_RESOURCE_KEY_PREFIX
} from './constants';
import { toPascalCaseFromKebabCase } from '../../utils/string';

const _getGenreResourceKey = (genre) => `${LIBRARY_RESOURCE_KEY_PREFIX}${toPascalCaseFromKebabCase(genre)}Genre`;
const _getRecentResourceKey = () => LIBRARY_RECENT_RESOURCE_KEY;

export const getDashboardResourceName = (genre) => {
    let resourceKey = _getRecentResourceKey();

    if (genre) {
        resourceKey = _getGenreResourceKey(genre);
    }

    return resourceKey;
};

export const getLibraryGenreKeysFromMovie = (genres) => genres.map(({ slug }) => _getGenreResourceKey(slug));
