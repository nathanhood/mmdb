import { lighten, darken } from 'polished';

const theme = {
    black: '#202121',
    gray: '#a6abab',
    lighterGray: '#f3f3f3',
    lightGray: '#e6eaea',
    white: '#fff',
    teal: '#22d0b2',
    darkTeal: '#18907B',
    blue: '#3776d9',
    loveRed: '#ed4e4e',
    wishYellow: '#ffe100',
    backgroundColor: '#f9f9f9',
    gutter: '5%',
    font: 'Roboto, Arial, sans-serif',
    headerHeight: '70px',
};

theme.linkColor = theme.teal;
theme.linkHoverColor = darken(0.05, theme.linkColor);

theme.fixedButtonColor = theme.darkTeal;
theme.fixedButtonActiveColor = lighten(0.04, theme.fixedButtonColor);

theme.buttonColor = theme.black;
theme.buttonActiveColor = lighten(0.06, theme.buttonColor);

theme.animations = {
    enterOffScreen: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
    exitOffScreen: 'cubic-bezier(0.4, 0.0, 1, 1)',
};

export default theme;
