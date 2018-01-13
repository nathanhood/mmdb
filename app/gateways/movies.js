import fetch from './index';
import _uniq from 'lodash/uniq';
import {
    extractDataFromResponse,
    EMPTY_API_RESPONSE
} from './utils';
import {
    DEFAULT_ORDER,
    DEFAULT_PAGE
} from './constants';


export const getUserMovies = ({
    order = DEFAULT_ORDER,
    page = DEFAULT_PAGE,
    genre = null,
}) => {
    let params = { order, page };

    if (genre) {
        params = { ...params, genre };
    }

    return fetch.get('movies', { params }).then(extractDataFromResponse);
};

export const getMovieSearchResults = (query, page = 1) => {
    // TODO: Account for promise with null result
    if (!query) {
        return Promise.resolve(EMPTY_API_RESPONSE);
    }

    return fetch.get('search/movie', {
        params: { query, page },
    }).then(extractDataFromResponse);
};

export const getMovieLibrarySearchResults = (query) => {
    if (!query) {
        return Promise.resolve(EMPTY_API_RESPONSE);
    }

    return fetch.get('movies', {
        params: { query },
    }).then(extractDataFromResponse);
};

export const addMovieToUserLibrary = ({ id, format, definition, platform }) => {
    return fetch.post('movies', {
        id,
        format,
        definition,
        platform,
    }).then(extractDataFromResponse);
};

export const removeMovieFromUserLibrary = (id) => fetch.delete(`movies/${id}`).then(extractDataFromResponse);

export const getRecentMovieFormats = () => {
    return fetch.get('movies/recent-formats', {
        params: { limit: 3 },
    }).then(({ data }) => _uniq(data.payload));
};

export const getRecentUserMovies = (page = 1) => getUserMovies('desc', page);

export const getUserMoviesByGenre = (genre, page = 1) => fetch.get('movies', {
    params: { genre, page },
}).then(extractDataFromResponse);

export const favoriteUserMovie = (id) => fetch.put(`movies/${id}/favorite`);

export const unFavoriteUserMovie = (id) => fetch.put(`movies/${id}/unfavorite`);

export const getUserMovieGenres = () => fetch.get('/movies/genres').then(extractDataFromResponse);
