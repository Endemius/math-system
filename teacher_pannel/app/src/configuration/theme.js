import { createTheme } from '@mui/material/styles';

const customTheme = createTheme({
    palette: {
        primary: {
            main: '#048BA8', // Call-to-Action Buttons
        },
        secondary: {
            main: '#5F00BA', // Links or Highlights
        },
        text: {
            primary: '#FBFEF9', // Light text on dark background
            secondary: '#FBFEF9A3',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        backgroundColor: '#F29E4C',
                        color: '#fff', // Change the text color on hover
                    },
                },
            },
        },
    },
});

export default customTheme;
