import React from 'react';
import PropTypes from 'prop-types';
import ListContainer from '../ListContainer';
import Card from '../Card';
import SearchCard from '../SearchCard';


function SearchList({ items, addMovieToLibrary, removeMovieFromLibrary, recentFormats }) {
    return (
        <ListContainer>
            {items.map((item) => (
                <Card key={item.id.toString() + item.apiId.toString()}>
                    <SearchCard
                      id={item.id}
                      apiId={item.apiId}
                      title={item.title}
                      poster={item.images.poster}
                      releaseDate={item.releaseDate}
                      isOwned={item.isOwned}
                      addToLibraryHandler={addMovieToLibrary}
                      removeFromLibraryHandler={removeMovieFromLibrary}
                      recentFormats={recentFormats}
                    />
                </Card>
            ))}
        </ListContainer>
    );
}

SearchList.propTypes = {
    items: PropTypes.array.isRequired,
    addMovieToLibrary: PropTypes.func,
    removeMovieFromLibrary: PropTypes.func,
    recentFormats: PropTypes.array,
};

export default SearchList;
