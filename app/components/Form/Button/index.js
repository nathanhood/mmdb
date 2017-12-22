import styled from 'styled-components';
import theme from 'theme';

const Button = styled.button`
    border-width: 1px;
    border-color: ${theme.buttonColor};
    border-radius: 2px;
    color: ${theme.buttonColor};
    padding: 8px 17px;
    width: ${(props) => props.wide ? '100%' : 'initial'};
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
