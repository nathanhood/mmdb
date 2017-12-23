import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import theme from '../../theme';
import themeVars from '../../variables';
import Icon from '../Icon';

const menuItemBorder = `1px solid ${themeVars.lightGray}`;
const menuItemLineHeight = '21px';

const StyledMobileNav = styled.div`
    background-color: ${themeVars.backgroundColor};
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 100px;
    z-index: 300;
    transform: ${(props) => props.open ? 'translateX(0)' : 'translateX(calc(-100% - 100px))'};
    transition: transform .35s ${({ open }) => open ? themeVars.animations.enterOffScreen : themeVars.animations.exitOffScreen};
    background: ${theme.white};
    border-right: 1px solid ${theme.lightGray};
`;

const StyledOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, .45);
    z-index: 200;
    opacity: ${({ open }) => open ? 1 : 0};
    visibility: ${({ open }) => open ? 'visible' : 'hidden'};
    transition: opacity .4s, visibility 0s ${({ open }) => open ? '0s' : '0.4s'};
`;

const StyledMenu = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 0;
`;

const StyledMenuItem = styled.li`
    a {
        display: flex;
        padding: 24px 36px;
        font-weight: bold;
        font-size: 18px;
        line-height: ${menuItemLineHeight};
        letter-spacing: 1px;
        text-decoration: none;
        border-bottom: ${menuItemBorder};
        color: ${themeVars.black};
        svg {
            color: ${theme.black} !important;
        }
    }
`;

const NavLinkText = styled.div`
padding-left: 15px;
font-size: 14px;
`;

const MenuHeader = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 24px 24px 24px 36px;
    border-bottom: ${menuItemBorder};
`;

const CloseButton = styled.div`
    height: ${menuItemLineHeight};
    padding-right: 30px;
    position: relative;
    text-transform: uppercase;
    font-size: 11px;
    line-height: ${menuItemLineHeight};
    &:before,
    &:after {
        position: absolute;
        top: 8px;
        right: 0px;
        width: 20px;
        height: 3px;
        background: ${theme.black};
        content: '';
    }
    &:before {
        transform: rotate(45deg);
    }
    &:after {
        transform: rotate(-45deg);
    }
`;

function MobileNav({ open, closeHandler, navItems }) {
    return (
        <div>
            <StyledMobileNav open={open}>
                <MenuHeader>
                    <CloseButton onClick={closeHandler}>close</CloseButton>
                </MenuHeader>
                <StyledMenu>
                    {navItems.map(({ display, url, icon }) => (
                        <StyledMenuItem key={url}>
                            <NavLink to={url} activeStyle={{ color: themeVars.teal }}>
                                {icon ? <Icon icon={icon} /> : null}
                                <NavLinkText>{display}</NavLinkText>
                            </NavLink>
                        </StyledMenuItem>
                    ))}
                </StyledMenu>
            </StyledMobileNav>
            <StyledOverlay open={open} onClick={closeHandler} />
        </div>
    );
}

MobileNav.propTypes = {
    open: PropTypes.bool,
    closeHandler: PropTypes.func,
    navItems: PropTypes.array
};

export default MobileNav;
