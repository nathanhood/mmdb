import _isEmpty from 'lodash/isEmpty';
import { setResource } from './actions';
import moment from 'moment';

const CACHE_MAX_LIFE = 3600000;

const createResource = (payload) => ({
    expires: moment().add(CACHE_MAX_LIFE).valueOf(),
    isLoading: false,
    dirty: false,
    payload,
});

const prepareResource = (key, fetcher, forceUpdate = false) => (dispatch, getState) => {
    const state = getState();
    const resource = state.resourceCache[key];

    if (
        !_isEmpty(resource) &&
        !forceUpdate &&
        !resource.dirty &&
        resource.expires > moment().valueOf()
    ) {
        return Promise.resolve(state.resourceCache[key].payload);
    }

    return fetcher().then((results) => {
        dispatch(setResource(key, createResource(results)));

        return results;
    });
}

export { prepareResource };
