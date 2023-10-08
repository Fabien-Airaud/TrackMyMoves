import { createTheme } from '@rneui/themed';

const DefaultTheme = createTheme({
    darkColors: {
        background: '#191919',
        white: '#090909',
        black: '#e4e4e4'
    },
    mode: 'dark',
    spacing: {
        xl: 40
    }
});

export default DefaultTheme;