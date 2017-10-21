import React from 'react';
import PropTypes from 'prop-types';

function SearchButton(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" onClick={props.clickHandler}>
            <path d="M8.5 17C3.80557963 17 0 13.1944204 0 8.5 0 3.80557963 3.80557963 0 8.5 0 13.1944204 0 17 3.80557963 17 8.5c0 4.6944204-3.8055796 8.5-8.5 8.5zm0-2c3.5898509 0 6.5-2.9101491 6.5-6.5C15 4.91014913 12.0898509 2 8.5 2 4.91014913 2 2 4.91014913 2 8.5 2 12.0898509 4.91014913 15 8.5 15z" />
            <path d="M19.7071068 18.2928932l-5.2-5.2c-.3905243-.3905243-1.0236893-.3905243-1.4142136 0-.3905243.3905243-.3905243 1.0236893 0 1.4142136l5.2 5.2c.3905243.3905243 1.0236893.3905243 1.4142136 0 .3905243-.3905243.3905243-1.0236893 0-1.4142136z" />
        </svg>
    );
}

SearchButton.propTypes = {
    clickHandler: PropTypes.func,
};

export default SearchButton;
