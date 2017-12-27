import styled from 'styled-components';
import theme from '../../theme';
import { Link } from 'react-router-dom';


const StyledLink = styled(Link)`
    color: ${theme.linkColor};
    &:hover {
        color: ${theme.linkHoverColor};
    }
`;

export default StyledLink;
