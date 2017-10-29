import { css } from 'styled-components';

export const transitionOpacity = css`
    transition: 200ms opacity ease-in-out;
    opacity: ${props => props.show ? 1 : 0};
    z-index: ${props => props.show ? 1 : 0};
`;
