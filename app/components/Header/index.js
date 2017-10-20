import React from 'react';
import styled from 'styled-components';
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

class Header extends React.PureComponent {
    render() {
        return (
            <header role="banner" className={header}>
                <Hamburger />
                <Logo>MMDb</Logo>
            </header>
        );
    }
}

Header.propTypes = {

};

export default Header;
