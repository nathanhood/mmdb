export {
    ADD_MOVIES,
    REMOVE_MOVIE,
    getMovies,
    favoriteMovie,
    unFavoriteMovie,
    removeMovie
} from './modules/movies';

export const ADD_ENTITIES = 'entities/ADD_ENTITIES';

export const addEntities = (entities) => ({
    type: ADD_ENTITIES,
    payload: entities,
});
