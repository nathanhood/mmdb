import fetch from './index';
import { extractDataFromResponse } from './utils';
import {
    REGISTER_URL,
    LOGIN_URL
} from '../common/constants';


export const loginUser = ({ username, password }) => {
    return fetch.post(LOGIN_URL, { username, password }).then(extractDataFromResponse);
};

export const registerUser = ({ email, username, password, passwordConfirmation }) => {
    return fetch.post(REGISTER_URL, { email, username, password, passwordConfirmation })
        .then(extractDataFromResponse);
}
