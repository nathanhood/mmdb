import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card';
import MovieCard from '../MovieCard';
import ListContainer from '../ListContainer';


function LibraryList({ items, favoriteHandler }) {
    return (
        <ListContainer>
            {items.map((item) => (
                <Card key={item.id}>
                    <MovieCard
                        title={item.title}
                        releaseDate={item.releaseDate}
                        poster={item.images.poster}
                        rating={item.rating}
                        isFavorite={item.isFavorite}
                        clickFavoriteHandler={() => favoriteHandler(item)}
                        genres={item.Genres}
                        definition={item.definition}
                    />
                </Card>
            ))}
        </ListContainer>
    );
}

LibraryList.propTypes = {
    items: PropTypes.array.isRequired,
    favoriteHandler: PropTypes.func.isRequired,
};

export default LibraryList;
