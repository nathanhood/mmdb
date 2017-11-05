import styled from 'styled-components';
import theme from 'theme';


const HeaderButton = styled.div`
    display: inline-flex;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 65px;
    border-right: 1px solid ${theme.lightGray};
    flex: 0 0 65px;
`;

export default HeaderButton;
