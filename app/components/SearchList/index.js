import React from 'react';
import PropTypes from 'prop-types';
import ListContainer from 'components/ListContainer';
import Card from 'components/Card';
import SearchCard from 'components/SearchCard';


function SearchList({ items, addMovieToLibrary }) {
    return (
        <ListContainer>
            {items.map((item) => (
                <Card key={item.id}>
                    <SearchCard
                      id={item.id}
                      title={item.title}
                      poster={item.images.poster}
                      releaseDate={item.releaseDate}
                      isOwned={item.isOwned}
                      addToLibraryHandler={addMovieToLibrary}
                    />
                </Card>
            ))}
        </ListContainer>
    );
}

SearchList.propTypes = {
    items: PropTypes.array.isRequired,
    addMovieToLibrary: PropTypes.func,
};

export default SearchList;
