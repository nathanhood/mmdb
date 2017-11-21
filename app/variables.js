import { lighten } from 'polished';

const theme = {
    black: '#202121',
    gray: '#a6abab',
    lightGray: '#e6eaea',
    white: '#fff',
    teal: '#22d0b2',
    darkTeal: '#18907B',
    blue: '#3776d9',
    loveRed: '#ed4e4e',
    backgroundColor: '#f9f9f9',
    gutter: '5%',
    font: 'Roboto, Arial, sans-serif',
};

theme.fixedButtonColor = theme.darkTeal;
theme.fixedButtonActiveColor = lighten(0.04, theme.fixedButtonColor);

export default theme;
