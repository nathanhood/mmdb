import fetch from './index';
import { extractDataFromResponse } from './utils';

export const getUserFormats = () => {
    return fetch.get('formats').then(extractDataFromResponse);
}
