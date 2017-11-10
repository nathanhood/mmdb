import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from 'theme';
import MovieCard from 'components/MovieCard';

const StyledContainer = styled.div`
    margin-left: ${theme.gutter};
    margin-right: ${theme.gutter};
`;


function CardList({ items }) {
    return (
        <StyledContainer>
            {items.map((item) => <MovieCard title={item.title} releaseDate={item.releaseDate} imageUrl={'http://via.placeholder.com/200x300'} key={item.id} />)}
        </StyledContainer>
    );
}

CardList.propTypes = {
    items: PropTypes.array.isRequired,
};

export default CardList;
