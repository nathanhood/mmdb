import { movie as movieSchema } from '../schema';
import {
    denormalize,
    normalize
} from 'normalizr';
import { getUserMovies } from '../../../gateways/movies';
import { MOVIES_STATE_KEY } from '../constants';
import { combineResponse } from '../utils';

export const ADD_MOVIES = 'entities/ADD_MOVIES';
export const APPEND_MOVIES = 'entities/APPEND_MOVIES';
export const PREPEND_MOVIES = 'entities/PREPEND_MOVIES';

export default (state = {}, action) => {
    switch (action.type) {
        case ADD_MOVIES:
            return Object.entries(action.payload.entities[MOVIES_STATE_KEY])
                .reduce((mergedMovies, [id, movie]) => {
                    return {
                        ...mergedMovies,
                        [id]: {
                            ...(mergedMovies[id] || {}),
                            ...movie,
                        },
                    };
                }, state);
        default:
            return state;
    }
};

export const addMovies = (payload) => ({
    type: ADD_MOVIES,
    payload,
});

export const getMovies = ({
    page = null,
    order = 'asc',
    genre = null,
} = {}, meta) => (dispatch, getState, schema) => {
    return getUserMovies({ page, order, genre })
        .then((results) => {
            const normalizedData = normalize(results.payload, [schema[MOVIES_STATE_KEY]]);
            const movies = combineResponse(results, normalizedData, meta);

            dispatch(addMovies(movies));

            return movies;
        });
};

export const selectHydrated = (state, id) => denormalize(id, movieSchema, state);
