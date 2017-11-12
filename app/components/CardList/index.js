import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from 'theme';
import LibraryCard from 'components/LibraryCard';
import MovieCard from 'components/MovieCard';

const StyledContainer = styled.div`
    padding-top: 20px;
    margin-left: ${theme.gutter};
    margin-right: ${theme.gutter};
`;


function CardList({ items }) {
    return (
        <StyledContainer>
            {items.map((item) => (
                <LibraryCard key={item.id}>
                    <MovieCard
                      title={item.title}
                      releaseDate={item.releaseDate}
                      imageUrl={'http://via.placeholder.com/200x300'}
                      rating={item.rating}
                      isFavorite={item.UserMovie.isFavorite}
                      genres={item.Genres}
                    />
                </LibraryCard>
            ))}
        </StyledContainer>
    );
}

CardList.propTypes = {
    items: PropTypes.array.isRequired,
};

export default CardList;
