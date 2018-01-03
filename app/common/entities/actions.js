export {
    ADD_MOVIES,
    getMovies
} from './modules/movies';

export const ADD_ENTITIES = 'entities/ADD_ENTITIES';

export const addEntities = (entities) => ({
    type: ADD_ENTITIES,
    payload: entities,
});
