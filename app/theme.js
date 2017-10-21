import createTheme from 'styled-components-theme';
import variables from './variables';

export default createTheme(...Object.keys(variables));
