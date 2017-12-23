import { logOut } from './actions';
import { removeUser } from '../../utils/localStorage';


export const logOutUser = () => (dispatch) => {
    removeUser();

    dispatch(logOut());
};
