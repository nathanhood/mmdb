import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledSVG = styled.svg`
    fill: ${(props) => props.invert ? props.color : props.fill} !important;
    margin-left: ${props => props.spacing || 0};
    line,
    path {
        stroke: ${(props) => props.invert ? props.fill : props.color};
    }
`;

const Icon = ({ color, size, strokeWidth, icon, viewBox, ...otherProps }) => {
    return (
        <StyledSVG
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox={viewBox || '0 0 24 24'}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          dangerouslySetInnerHTML={{ __html: icon }}
          color={color}
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
    viewBox: PropTypes.string,
};

Icon.defaultProps = {
    color: 'currentColor',
    size: '20',
    fill: 'none',
    strokeWidth: 2,
};

export default Icon;
