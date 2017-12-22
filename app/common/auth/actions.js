export const AUTH_SUCCESSFUL = 'auth/AUTH_SUCCESSFUL';
export const AUTH_FAILURE = 'auth/AUTH_FAILURE';
export const REGISTER_SUCCESSFUL = 'auth/REGISTER_SUCCESSFUL';
export const REGISTER_FAILURE = 'auth/REGISTER_FAILURE';

export const authSuccess = (user) => ({
    type: AUTH_SUCCESSFUL,
    payload: user,
});

export const authFailure = () => ({
    type: AUTH_FAILURE,
});

export const registerSuccess = () => ({
    type: REGISTER_SUCCESSFUL,
});

export const registerFailure = () => ({
    type: REGISTER_FAILURE,
});
