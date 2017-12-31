import { populateRecentFormats } from './actions';
import { getRecentMovieFormats } from '../../gateways/movies';
import { prepareResource } from '../../common/resourceCache/thunks';
import { RECENT_FORMATS_RESOURCE_KEY } from '../../common/resourceCache/constants';
import _uniqBy from 'lodash/uniqBy';

export const prepareRecentFormats = (forceUpdate) => (dispatch, getState) => {
    const state = getState();
    const formats = state.app.formats.movie;

    dispatch(prepareResource(RECENT_FORMATS_RESOURCE_KEY, getRecentMovieFormats, forceUpdate))
        .then((result) => {
            const recentFormats = _uniqBy(
                result.map((format) => {
                    return formats.find((f) => f.value === format)
                }).concat(formats),
                'value'
            ).slice(0, 3);

            dispatch(populateRecentFormats(recentFormats));
        });
};
