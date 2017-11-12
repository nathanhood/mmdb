import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledSVG = styled.svg`
    fill: ${props => props.fill} !important;
`;

const Icon = (props) => {
    const { color, size, strokeWidth, icon, ...otherProps } = props;

    return (
        <StyledSVG
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          dangerouslySetInnerHTML={{ __html: icon }}
          {...otherProps}
        />
    );
};

Icon.propTypes = {
    color: PropTypes.string,
    size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    fill: PropTypes.string,
    strokeWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

Icon.defaultProps = {
    color: 'currentColor',
    size: '20',
    fill: 'none',
    strokeWidth: 1,
};

export default Icon;
