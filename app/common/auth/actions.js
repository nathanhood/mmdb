export const AUTH_SUCCESSFUL = 'auth/AUTH_SUCCESSFUL';
export const AUTH_FAILURE = 'auth/AUTH_FAILURE';

export const authSuccess = (user) => ({
    type: AUTH_SUCCESSFUL,
    payload: user,
});

export const authFailure = () => ({
    type: AUTH_FAILURE,
});
