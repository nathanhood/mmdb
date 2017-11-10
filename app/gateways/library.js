import axios from './index';

export const getLibrary = () => {
    return axios.get('movie-library');
};
