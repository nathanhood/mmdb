import {
    ConnectedRouter,
    LOCATION_CHANGE
} from 'react-router-redux';
import queryString from 'query-string';


class CustomConnectedRouter extends ConnectedRouter {
    handleLocationChange = (location) => {
        const query = queryString.parse(location.search);

        this.store.dispatch({
            type: LOCATION_CHANGE,
            payload: {
                ...location,
                query,
            },
        });
    }
}

export default CustomConnectedRouter;
