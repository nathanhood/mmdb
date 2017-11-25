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
