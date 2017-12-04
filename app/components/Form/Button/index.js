import styled from 'styled-components';
import theme from 'theme';

const Button = styled.button`
    border-width: 2px;
    border-color: ${theme.buttonColor};
    border-radius: 2px;
    color: ${theme.buttonColor};
    padding: 6px 15px;
    &:hover,
    &:active {
        color: ${theme.white};
    }
    &:hover {
        background-color: ${theme.buttonColor};
    }
    &:active {
        background-color: ${theme.buttonActiveColor};
    }
`;

export default Button;
