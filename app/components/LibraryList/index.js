import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card';
import MovieCard from '../MovieCard';
import ListContainer from '../ListContainer';
import { paginationPropTypeShape } from '../../common/entities/pagination';


function LibraryList({ items, favoriteHandler, removeHandler }) {
    if (!items) {
        return null;
    }

    // TODO: Finish Paginate Heading
    const content = items.pageResult.map((pageNumber) => (
        <div key={'libaryPage' + pageNumber}>
            <div>{pageNumber}</div>
            {items.pages[pageNumber].map((item) => (
                <Card key={item.id}>
                    <MovieCard
                        title={item.title}
                        releaseDate={item.releaseDate}
                        poster={item.images.poster}
                        rating={item.rating}
                        isFavorite={item.isFavorite}
                        clickHeartHandler={() => favoriteHandler(item)}
                        clickTrashHandler={() => removeHandler(item)}
                        genres={item.Genres}
                        definition={item.definition}
                    />
                </Card>
            ))}
        </div>
    ));

    return (
        <ListContainer>
            {content}
        </ListContainer>
    );
}

LibraryList.propTypes = {
    items: paginationPropTypeShape,
    favoriteHandler: PropTypes.func.isRequired,
    removeHandler: PropTypes.func.isRequired,
};

export default LibraryList;
