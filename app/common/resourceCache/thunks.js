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

const prepareResource = (key, fetcher, forceUpdate = false, page = 1) => (dispatch, getState) => {
    const state = getState();
    const resource = state.resourceCache[key];

    // Conditions that will cause the cache to be purged
    //   Resource does not exist
    //   Resource has already been marked dirty
    //   forceUpdate has been passed into function
    //   The page is different from the page of resource
    //   The resource cache property has expired
    if (
        !_isEmpty(resource) &&
        !forceUpdate &&
        !resource.dirty &&
        resource.payload.page === page &&
        resource.expires > moment().valueOf()
    ) {
        return Promise.resolve(resource.payload);
    }

    return fetcher().then((results) => {
        dispatch(setResource(key, createResource(results)));

        return results;
    });
}

export { prepareResource };
