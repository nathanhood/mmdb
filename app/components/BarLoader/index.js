import styled from 'styled-components';
import theme from '../../theme';

const width = '40vw';

const BarLoader = styled.div`
    @keyframes loader-slide {
        from {
            transform: translateX(-${width});
        }
        to {
            transform: translateX(100vw);
        }
    }

    position: absolute;
    top: 0;
    width: 100%;
    height: 3px;
    background: ${theme.teal};
    position: relative;
    opacity: 0.5;
    &:before {
        transform: translateX(-${width});
        height: 100%;
        width: ${width};
        content: '';
        position: absolute;
        background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.8) 80%, rgba(255, 255, 255, 0) 100%);
        animation: 1.5s ease-in-out loader-slide 0s infinite;
    }
`;

export default BarLoader;
