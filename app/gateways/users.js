import fetch from './index';
import { extractDataFromResponse } from './utils';


export const loginUser = ({ username, password }) => {
    return fetch.post('/login', { username, password }).then(extractDataFromResponse);
};

export const registerUser = ({ email, username, password, passwordConfirmation }) => {
    return fetch.post('/register', { email, username, password, passwordConfirmation })
        .then(extractDataFromResponse);
}
