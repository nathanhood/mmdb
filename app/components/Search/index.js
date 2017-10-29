import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { transitionOpacity } from 'mixins';
import HeaderButton from 'components/HeaderButton';
import theme from 'theme';

const StyledContainer = styled.div`
    display: flex;
    position: absolute;
    width: 100%;
    height: 100%;
    ${transitionOpacity}
`;

const closeBar = css`
    background: ${theme.black};
    content: '';
    height: 3px;
    width: 20px;
    position: absolute;
    top: 7px;
    left: -1px;
`;

const CloseSearch = styled.div`
    height: 18px;
    width: 18px;
    position: relative;
    &::after {
        ${closeBar}
        transform: rotate(45deg);
    }
    &::before {
        ${closeBar}
        transform: rotate(-45deg);
    }
`;

const StyledInput = styled.input`
    flex: 1 0 calc(100% - 65px);
    padding-left: 25px;
`;

const Search = (props) => {
    return (
        <StyledContainer show={props.show}>
            <StyledInput type="text" placeholder="Find a movie" />
            <HeaderButton>
                <CloseSearch onClick={props.close} />
            </HeaderButton>
        </StyledContainer>
    );
}

Search.propTypes = {
    close: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
};

export default Search;
