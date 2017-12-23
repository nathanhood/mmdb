import { loginUser } from '../../gateways/users';
import { replace } from 'react-router-redux';
import { authSuccess, authFailure } from '../../common/auth/actions';
import { storeUser } from '../../utils/localStorage';
import { setAuthorization } from '../../gateways/index';
import { DASHBOARD_URL } from '../../common/constants';


export const submitLogin = ({ username, password }) => (dispatch, getState) => {
    const { route: { location } } = getState();
    const redirectLocation = location.state && location.state.from;
    const fallbackLocation = {
        pathname: DASHBOARD_URL,
        state: {
            from: location,
        },
    };

    return loginUser({ username, password }).then(({ user }) => {
        // Set user in local storage to keep user signed in after page refresh
        storeUser(user);

        // Set Authorization header for future fetching
        setAuthorization(user.token);

        dispatch(authSuccess(user));
        dispatch(replace(redirectLocation || fallbackLocation));
    }).catch(() => {
        // TODO: Give user feedback on form on error
        dispatch(authFailure());
    });
};
