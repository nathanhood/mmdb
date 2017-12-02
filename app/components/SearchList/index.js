import React from 'react';
import PropTypes from 'prop-types';
import ListContainer from 'components/ListContainer';
import Card from 'components/Card';
import SearchCard from 'components/SearchCard';


function SearchList({ items }) {
    return (
        <ListContainer>
            {items.map((item) => (
                <Card key={item.tmdbId}>
                    <SearchCard
                      title={item.title}
                      poster={item.images.poster}
                      releaseDate={item.releaseDate}
                      isOwned={item.isOwnedByUser}
                    />
                </Card>
            ))}
        </ListContainer>
    );
}

SearchList.propTypes = {
    items: PropTypes.array.isRequired,
};

export default SearchList;
