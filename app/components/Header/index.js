import React from 'react';
import styled from 'styled-components';
import theme from 'theme';
import Hamburger from 'components/Hamburger';
import { header } from './style.scss';

const Logo = styled.h1`
    font-family: Poppins, sans-serif;
    letter-spacing: 1px;
    font-size: 30px;
    margin: 0;
    display: inline;
    flex: 0 0 calc(100% - 130px);
    text-align: center;
`;
const MenuButton = styled.div`
    display: inline-flex;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 65px;
    border-right: 1px solid ${theme.lightGray};
    flex: 0 0 65px;
    &:hover {
        &:first-child {
            &::after {
                left: 0;
            }
        }
    }
`;

class Header extends React.PureComponent {
    render() {
        return (
            <header role="banner" className={header}>
                <MenuButton>
                    <Hamburger />
                </MenuButton>
                <Logo>MMDb</Logo>
            </header>
        );
    }
}

Header.propTypes = {

};

export default Header;
