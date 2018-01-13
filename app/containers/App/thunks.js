import { populateRecentFormats } from './actions';
import { getRecentMovieFormats } from '../../gateways/movies';
import { prepareResource } from '../../common/resourceCache/thunks';
import { RECENT_FORMATS_RESOURCE_KEY } from '../../common/resourceCache/constants';
import _uniq from 'lodash/uniq';

export const prepareRecentFormats = (forceUpdate) => (dispatch, getState) => {
    const state = getState();
    const formats = state.entities.formats;

    dispatch(prepareResource(RECENT_FORMATS_RESOURCE_KEY, getRecentMovieFormats, forceUpdate))
        .then((result) => {
            const formatsArray = Object.keys(formats);
            const recentFormats = _uniq(result.concat(formatsArray)).slice(0, 3);

            dispatch(populateRecentFormats(recentFormats));
        });
};
