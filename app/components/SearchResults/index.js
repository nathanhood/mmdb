import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import theme from 'theme';
import SearchList from '../SearchList';

const StyledContainer = styled.div`
    background: ${theme.backgroundColor};
    height: calc(100% - ${theme.headerHeight});
    position: fixed;
    overflow: scroll;
    left: 0;
    right: 0;
    z-index: 99;
`;

const SearchResults = ({ items, ...otherProps }) => {
    return (
        <StyledContainer>
            <SearchList items={items} {...otherProps} />
        </StyledContainer>
    );
}

SearchResults.propTypes = {
    items: PropTypes.array,
};

SearchResults.defaultProps = {
    isVisible: false,
};

export default SearchResults;
