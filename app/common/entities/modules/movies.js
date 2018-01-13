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
export const FAVORITE_MOVIE = 'entities/FAVORITE_MOVIE';
export const UNFAVORITE_MOVIE = 'entities/UNFAVORITE_MOVIE';
export const REMOVE_MOVIE = 'entities/REMOVE_MOVIE';

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
        case FAVORITE_MOVIE:
            return {
                ...state,
                [action.payload.id]: {
                    ...state[action.payload.id],
                    isFavorite: true,
                },
            };
        case UNFAVORITE_MOVIE:
            return {
                ...state,
                [action.payload.id]: {
                    ...state[action.payload.id],
                    isFavorite: false,
                },
            };
        case REMOVE_MOVIE:
            delete state[action.payload.id];

            return { ...state };
        default:
            return state;
    }
};

export const addMovies = (payload) => ({
    type: ADD_MOVIES,
    payload,
});

export const favoriteMovie = (payload) => ({
    type: FAVORITE_MOVIE,
    payload,
});

export const unFavoriteMovie = (payload) => ({
    type: UNFAVORITE_MOVIE,
    payload,
});

export const removeMovie = (payload) => ({
    type: REMOVE_MOVIE,
    payload,
});

/**
 * Normalize and add movies to state from API response
 * This method is extracted from 'getMovies' so we are not married to
 * one gateway method (ie - search results)
 *
 * @param {object} results - API response
 * @param {object|undefined} meta - Additional data to be used for reducer context
 */
export const addMoviesFromAPI = (results, meta) => (dispatch, getState, schema) => {
    const normalizedData = normalize(results.payload, [schema[MOVIES_STATE_KEY]]);
    const movies = combineResponse(results, normalizedData, meta);

    dispatch(addMovies(movies));

    return movies;
};

export const getMovies = ({
    page = null,
    order = 'asc',
    genre = null,
} = {}, meta) => (dispatch) => {
    return getUserMovies({ page, order, genre })
        .then((results) => dispatch(addMoviesFromAPI(results, meta)));
};

export const selectHydrated = (state, id) => denormalize(id, movieSchema, state);
