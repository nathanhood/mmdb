import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import theme from 'theme';
import Hamburger, { Bar } from 'components/Hamburger';
import SearchButton from 'components/SearchButton';

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
        ${Bar} {
            &::after {
                left: 0;
            }
        }
    }
`;
const StyledHeader = styled.header`
    border-bottom: 1px solid ${theme.lightGray};
    height: 70px;
    display: flex;
    align-items: center;
`;

class Header extends React.PureComponent {
    render() {
        return (
            <StyledHeader role="banner">
                <MenuButton>
                    <Hamburger />
                </MenuButton>
                <Logo>MMDb</Logo>
                <MenuButton>
                    <SearchButton clickHandler={this.props.toggleSearch} />
                </MenuButton>
            </StyledHeader>
        );
    }
}

Header.propTypes = {
    toggleSearch: PropTypes.func,
};

export default Header;
