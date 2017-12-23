import { logOut } from './actions';
import { removeUser } from '../../utils/localStorage';
import { resetResourceCache } from '../resourceCache/actions';
import { resetDashboard } from '../../containers/DashboardPage/actions';


export const logOutUser = () => (dispatch) => {
    removeUser();

    dispatch(logOut());
    dispatch(resetResourceCache());
    dispatch(resetDashboard());
};
