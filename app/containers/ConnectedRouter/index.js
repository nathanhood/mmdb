import {
    ConnectedRouter,
    LOCATION_CHANGE
} from 'react-router-redux';
import queryString from 'query-string';


class CustomConnectedRouter extends ConnectedRouter {
    updateLocation = (location) => ({
        ...location,
        query: queryString.parse(location.search)
    });

    handleLocationChange = (location) => {
        this.store.dispatch({
            type: LOCATION_CHANGE,
            payload: this.updateLocation(location),
        });
    };
}

export default CustomConnectedRouter;
