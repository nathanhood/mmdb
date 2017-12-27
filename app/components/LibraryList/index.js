import React from 'react';
import PropTypes from 'prop-types';
import Card from 'components/Card';
import MovieCard from 'components/MovieCard';
import ListContainer from 'components/ListContainer';


function LibraryList({ items }) {
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
};

export default LibraryList;
