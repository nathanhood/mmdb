import axios from 'axios';
import { getUser } from '../utils/localStorage';

const user = getUser() || {};

const getAuthorizationHeaderValue = (token) => token ? `bearer ${token}` : null;

const fetch = axios.create({
    baseURL: '/api/v1/',
    headers: {
        Authorization: getAuthorizationHeaderValue(user.token),
    },
});

export const setAuthorization = (token) => {
    fetch.defaults.headers.Authorization = getAuthorizationHeaderValue(token);
};

export default fetch;
