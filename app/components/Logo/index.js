import styled from 'styled-components';


const Logo = styled.h1`
    font-family: Poppins, sans-serif;
    letter-spacing: 1px;
    font-size: 30px;
    margin: 0;
    display: ${({ header }) => header ? 'inline' : 'block'};
    flex: 0 0 calc(100% - 130px);
    text-align: center;
`;

export default Logo;
