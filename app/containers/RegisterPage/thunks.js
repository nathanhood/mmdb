import { replace } from 'react-router-redux';
import { registerUser } from '../../gateways/users';
import { registerSuccess, registerFailure } from '../../common/auth/actions';
import { LOGIN_URL } from '../../common/constants';

export const submitRegister = ({ username, email, password, passwordConfirmation }) => (dispatch) => {
    const loginLocation = {
        pathname: LOGIN_URL,
        state: {},
    };

    return registerUser({ username, email, password, passwordConfirmation }).then(() => {
        dispatch(registerSuccess());
        dispatch(replace(loginLocation));
    }).catch(() => {
        // TODO: Give user feedback on form on error
        dispatch(registerFailure());
    });
};
