import fetch from './index';

const extractDataFromResponse = ({ data }) => data;

export const getMovies = () => fetch.get('movies').then(extractDataFromResponse);

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
