import React from 'react';
import PropType from 'prop-types';

class Button extends React.PureComponent {
    render() {
        return (
            <button>
                {this.props.children}
            </button>
        );
    }
}

Button.propTypes = {
    children: PropType.node.isRequired,
};

export default Button;
