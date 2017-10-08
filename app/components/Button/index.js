/**
*
* Button
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import { button } from './style.scss';

class Button extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <button className={button}>
                {this.props.children}
            </button>
        );
    }
}

Button.propTypes = {

};

export default Button;
