import fetch from './index';
import { extractDataFromResponse } from './utils';


export const loginUser = ({ username, password }) => {
    return fetch.post('/login', { username, password }).then(extractDataFromResponse);
};
