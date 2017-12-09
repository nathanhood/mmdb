import fetch from './index';
import _uniqBy from 'lodash/uniqBy';

const extractDataFromResponse = ({ data }) => data;

export const getMovies = (order = 'ASC') => fetch.get('movies', {
    params: { order },
}).then(extractDataFromResponse);

export const getMovieSearchResults = (query, page = 1) => {
    if (!query) {
        return null;
    }

    return fetch.get('search/movie', {
        params: { query, page },
    }).then(extractDataFromResponse);
};

export const addMovieToUserLibrary = ({ id, format }) => fetch.post('movies', { id, format }).then(extractDataFromResponse);

export const removeMovieFromUserLibrary = (id) => fetch.delete(`movies/${id}`).then(extractDataFromResponse);

export const getRecentMovieFormats = () => {
    return fetch.get('movies/recent-formats', {
        params: { limit: 3 },
    }).then(({ data }) => _uniqBy(data.payload, 'format').map((movie) => movie.format));
};
