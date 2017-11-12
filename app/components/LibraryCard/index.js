import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import theme from 'theme';


const StyledContainer = styled.div`
    background: ${theme.white};
    border-radius: 2px;
    margin-bottom: 25px;
    padding: 15px;
`;

function LibraryCard({ children }) {
    return (
        <StyledContainer>{children}</StyledContainer>
    );
}

LibraryCard.propTypes = {
    children: PropTypes.node,
};

export default LibraryCard;
