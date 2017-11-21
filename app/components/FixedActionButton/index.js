import React from 'react';
import styled from 'styled-components';
import feather from 'feather-icons';
import PropTypes from 'prop-types';
import theme from 'theme';
import Icon from 'components/Icon';
import themeVars from 'variables';


const StyledButton = styled.button`
    background-color: ${theme.fixedButtonColor};
    border-radius: 50%;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12), 0 3px 1px -2px rgba(0,0,0,.2);
    border: none;
    height: 56px;
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 56px;
    z-index: 100;
    &:active {
        background-color: ${theme.fixedButtonActiveColor};
    }
    &:focus {
        outline: none;
    }
`;

const FixedActionButton = ({ clickHandler }) => {
    return (
        <StyledButton onClick={clickHandler}>
            <Icon
              size={22}
              color={themeVars.white}
              icon={feather.icons.plus}
            />
        </StyledButton>
    );
}

FixedActionButton.propTypes = {
    clickHandler: PropTypes.func,
};

export default FixedActionButton;
