import {
    selectMovie,
    selectPaginatedEntity
} from '../../common/entities/selectors';

export const selectPaginatedLibraryResource = ({ dashboard: state, entities }) => {
    const { activeResource } = state;
    const resource = state[activeResource];

    if (!resource) {
        return null;
    }

    return selectPaginatedEntity(resource, selectMovie, entities);
};
