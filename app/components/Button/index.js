/**
*
* Button
*
*/

import React from 'react';
import PropType from 'prop-types';
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
    children: PropType.node.isRequired,
};

export default Button;
