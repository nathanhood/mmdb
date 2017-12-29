import styled from 'styled-components';
import themeVars from '../../variables';


const HeaderButton = styled.div`
    display: inline-flex;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 65px;
    border-right: ${({ borderRight }) => borderRight ? '1px solid ' + themeVars.lightGray : 'none'};
    flex: 0 0 65px;
`;

export default HeaderButton;
