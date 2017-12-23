import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import theme from 'theme';
import feather from 'feather-icons';
import Hamburger, { Bar } from '../Hamburger';
import Icon from '../Icon';
import SearchField from '../SearchField';
import { transitionOpacity } from 'mixins';
import HeaderButton from '../HeaderButton';
import { LIBRARY_SEARCH_TYPE } from '../../containers/SearchResults/constants';


const MenuButton = HeaderButton.extend`
    &:hover {
        ${Bar} {
            &::after {
                left: 0;
            }
        }
    }
`;
const Logo = styled.h1`
    font-family: Poppins, sans-serif;
    letter-spacing: 1px;
    font-size: 30px;
    margin: 0;
    display: inline;
    flex: 0 0 calc(100% - 130px);
    text-align: center;
`;
const StyledHeader = styled.header`
    background: ${theme.white};
    border-bottom: 1px solid ${theme.lightGray};
    height: ${theme.headerHeight};
    position: relative;
`;
const StyledInnerHeader = styled.div`
    display: flex;
    align-items: center;
    position: absolute;
    width: 100%;
    height: 100%;
    ${transitionOpacity}
`;

const Header = ({
    hideSearchHandler,
    showSearchHandler,
    searchIsVisible,
    searchType,
    submitSearchHandler,
    openMobileNavHandler,
}) => {
    return (
        <StyledHeader role="banner">
            <SearchField closeHandler={hideSearchHandler} isVisible={searchIsVisible} type={searchType} submitHandler={submitSearchHandler} />
            <StyledInnerHeader show={!searchIsVisible}>
                <MenuButton onClick={openMobileNavHandler}>
                    <Hamburger />
                </MenuButton>
                <Logo>MMDb</Logo>
                <MenuButton onClick={() => showSearchHandler(LIBRARY_SEARCH_TYPE)}>
                    <Icon
                      size={22}
                      icon={feather.icons.search}
                    />
                </MenuButton>
            </StyledInnerHeader>
        </StyledHeader>
    );
};

Header.propTypes = {
    hideSearchHandler: PropTypes.func,
    showSearchHandler: PropTypes.func,
    searchIsVisible: PropTypes.bool,
    searchType: PropTypes.string,
    submitSearchHandler: PropTypes.func,
    openMobileNavHandler: PropTypes.func,
};

export default Header;
