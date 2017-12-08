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
    border: {(props) => props.border || '1px solid ' + props.theme.lightGray};
    border-radius: 2px;
    border-color: ${theme.gray};
    width: {(props) => props.width || '100%'};
    display: block;
    margin-left: auto;
    margin-right: auto;
`;

function Select({ options, placeholder, onChange, ...otherProps }) {
    const PLACEHOLDER_VALUE = '__placeholder';
    const _onChangeHandler = (e) => {
        const value = e.target.value;

        if (value !== PLACEHOLDER_VALUE) {
            onChange(e);
        }
    };
    let placeholderOption;

    if (placeholder) {
        placeholderOption = <option value={PLACEHOLDER_VALUE}>{placeholder}</option>;
    }

    return (
        <StyledSelect onChange={_onChangeHandler} {...otherProps}>
            {placeholderOption}
            {options.map((option) => (
                <option key={option.value} value={option.value}>{option.display}</option>
            ))}
        </StyledSelect>
    );
}

Select.propTypes = {
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    width: PropTypes.string,
    border: PropTypes.string,
};

export default Select;
