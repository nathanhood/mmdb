import React from 'react';
import styled from 'styled-components';
import theme from 'theme';

const StyledHamburger = styled.div`
    position: relative;
    width: 15px;
    height: 13px;
`;

export const Bar = styled.div`
    position: absolute;
    height: 3px;
    background: ${theme.black};
    overflow: hidden;
    &::after {
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        background: ${theme.gray};
        position: absolute;
        top: 0;
        left: 100%;
        z-index: 1;
        transition: all .3s ease-in-out;
    }
    &:nth-child(1) {
        top: 0;
        width: 9px;
        &::after {
            transition-delay: .1s;
        }
    }
    &:nth-child(2) {
        top: 5px;
        width: 15px;
        &::after {
            transition-delay: .2s;
        }
    }
    &:nth-child(3) {
        top: 10px;
        width: 12px;
        &::after {
            transition-delay: .3s;
        }
    }
`;

const Hamburger = () => (
    <StyledHamburger>
        <Bar />
        <Bar />
        <Bar />
    </StyledHamburger>
);

export default Hamburger;
