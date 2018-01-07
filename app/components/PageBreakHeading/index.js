import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from '../../theme';


const StyledDiv = styled.div`
    text-align: center;
    position: relative;
    z-index: 0;
    padding-top: 20px;
    margin-left: ${theme.gutter};
    margin-right: ${theme.gutter};
    color: ${theme.gray};
    &::before {
        top: 30px;
        content: '';
        display: block;
        height: 1px;
        background: ${theme.gray};
        left: 0;
        right: 0;
        position: absolute;
        z-index: -1;
    }
`;

const StyledSpan = styled.span`
    z-index: 10;
    background-color: ${theme.backgroundColor};
    padding-left: 10px;
    padding-right: 10px;
    color: inherit;
    text-transform: uppercase;
    font-size: 12px;
`;

function PageBreakHeading({ children }) {
    return (
        <StyledDiv>
            <StyledSpan>{children}</StyledSpan>
        </StyledDiv>
    );
}

PageBreakHeading.propTypes = {
    children: PropTypes.node,
};

export default PageBreakHeading;
