export {
    ADD_MOVIES,
    REMOVE_MOVIE,
    getMovies,
    favoriteMovie,
    unFavoriteMovie,
    removeMovie,
    addMoviesFromAPI
} from './modules/movies';

export { getFormats } from './modules/formats';

export { addDefinitions } from './modules/definitions';

export { addPlatforms } from './modules/platforms';

export const ADD_ENTITIES = 'entities/ADD_ENTITIES';

export const addEntities = (entities) => ({
    type: ADD_ENTITIES,
    payload: entities,
});
