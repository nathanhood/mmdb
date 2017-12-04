import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { toSvg } from 'feather-icons';
import theme from 'theme';


const StyledSelect = styled.select`
    color: ${theme.black};
    background-image: url('${() => 'data:image/svg+xml;utf8,' + toSvg('chevron-down')}');
    background-size: 16px;
    background-position: calc(100% - 10px);
    background-repeat: no-repeat;
    padding: 7px 29px 7px 10px;
    border-radius: 2px;
    border-color: ${theme.black};
`;

function Select({ options, ...otherProps }) {
    return (
        <StyledSelect {...otherProps}>
            {options.map((option) => (
                <option key={option.value} value={option.value}>{option.display}</option>
            ))}
        </StyledSelect>
    );
}

Select.propTypes = {
    options: PropTypes.array.isRequired,
};

export default Select;
