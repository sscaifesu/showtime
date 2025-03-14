import {createTheme} from '@mui/material';

export const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#2196F3',
            light: '#64B5F6',
            dark: '#1976D2'
        },
        secondary: {
            main: '#F50057',
            light: '#FF4081',
            dark: '#C51162'
        },
        background: {
            default: '#F5F5F5',
            paper: '#FFFFFF'
        }
    },
    typography: {
        fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
        h4: {
            fontWeight: 600,
            letterSpacing: '-0.02em'
        },
        button: {
            textTransform: 'none',
            fontWeight: 500
        }
    },
    shape: {
        borderRadius: 12
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                    padding: '8px 24px',
                    boxShadow: 'none'
                },
                contained: {
                    '&:hover': {
                        boxShadow: 'none'
                    }
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)'
                }
            }
        }
    }
}); 