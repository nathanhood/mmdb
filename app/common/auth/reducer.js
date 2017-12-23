import {
    AUTH_SUCCESSFUL,
    AUTH_FAILURE,
    LOG_OUT
} from './actions';
import { getUser } from '../../utils/localStorage';

const user = getUser();
const unAuthenticated = { isAuthenticated: false, user: {} };

const authReducer = (state = { user, isAuthenticated: user !== null }, action) => {
    switch (action.type) {
        case AUTH_SUCCESSFUL:
            return { ...state, isAuthenticated: true, user: action.payload };
        case AUTH_FAILURE:
            return { ...state, ...unAuthenticated };
        case LOG_OUT:
            return { ...state, ...unAuthenticated };
        default:
            return state;
    }
}

export default authReducer;
