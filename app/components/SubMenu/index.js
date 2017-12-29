import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import queryString from 'query-string';
import isEmpty from 'lodash/isEmpty';

import theme from '../../theme';
import themeVars from '../../variables';
import { DASHBOARD_URL } from '../../common/constants';


const menuHeight = '27px';
const scrollBarHeight = '15px';
const menuItemHorizontalPadding = '15px';

const MenuItem = styled.li`
    list-style: none;
    font-size: 11px;
    flex: 1 0 auto;
    a {
        padding: 7px ${menuItemHorizontalPadding};
        text-decoration: none;
        color: ${theme.black};
        text-transform: uppercase;
        display: block;
        &:hover {
            color: ${theme.darkGray};
        }
    }
`;

const MenuList = styled.ul`
    position: relative;
    display: flex;
    margin: 0;
    padding: 0;
    overflow-X: scroll;
    height: calc(${menuHeight} + ${scrollBarHeight});
    padding-bottom: ${scrollBarHeight};
`;

const MenuContainer = styled.div`
    position: relative;
    width: 100%;
    height: ${menuHeight};
    background: ${theme.white};
    overflow: hidden;
    border-bottom: 1px solid ${themeVars.lightGray};
    -webkit-overflow-scrolling: touch;
    &::before,
    &::after {
        content: '';
        background: linear-gradient(90deg, ${themeVars.white} 20%, rgba(255, 255, 255, 0.001) 100%);
        position: absolute;
        top: 0;
        z-index: 1;
        width: ${menuItemHorizontalPadding};
        height: 100%;
    }
    &::before {
        left: 0;
    }
    &::after {
        right: 0;
        transform: rotate(180deg);
    }
`;

class SubMenu extends React.Component {
    static propTypes = {
        items: PropTypes.array.isRequired,
        itemClickHandler: PropTypes.func,
    };

    render() {
        const { items, itemClickHandler } = this.props;

        return (
            <MenuContainer>
                <MenuList>
                    {items.map(({ url, display, filter }, i) => (
                        <MenuItem key={i.toString() + display}>
                            <NavLink
                                to={url}
                                activeStyle={{ color: themeVars.teal }}
                                onClick={() => itemClickHandler ? itemClickHandler(filter) : null}
                                isActive={(match, { search }) => {
                                    const { genre: currentGenre } = queryString.parse(search);
                                    const { genre } = queryString.parse(url.replace(DASHBOARD_URL, ''));

                                    if (!currentGenre && !genre) {
                                        return !isEmpty(match);
                                    }

                                    return genre === currentGenre;
                                }}
                            >
                                {display}
                            </NavLink>
                        </MenuItem>
                    ))}
                </MenuList>
            </MenuContainer>
        )
    }
}

export default SubMenu;
