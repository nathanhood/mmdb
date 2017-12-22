import {
    AUTH_SUCCESSFUL,
    AUTH_FAILURE
} from './actions';
import { getUser } from '../../utils/localStorage';

const user = getUser();

const authReducer = (state = { user, isAuthenticated: user !== null }, action) => {
    switch (action.type) {
        case AUTH_SUCCESSFUL:
            return { ...state, isAuthenticated: true, user: action.payload };
        case AUTH_FAILURE:
            return { ...state, isAuthenticated: false, user: {} };
        default:
            return state;
    }
}

export default authReducer;
