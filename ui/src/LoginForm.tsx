import {Box, Button, TextField, Typography, Paper, Container} from '@mui/material';
import {UseConfig} from './useConfig';
import {useState} from 'react';

export const LoginForm = ({config, hide}: {config: UseConfig; hide?: () => void}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 3
            }}
        >
            <Container maxWidth="xs">
                <Paper
                    elevation={24}
                    sx={{
                        borderRadius: 3,
                        overflow: 'hidden',
                        background: 'rgba(255, 255, 255, 0.98)',
                        backdropFilter: 'blur(10px)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
                    }}
                >
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2.5,
                        p: 3,
                    }}>
                        <Typography 
                            variant="h5" 
                            fontWeight={600} 
                            textAlign="center"
                            sx={{
                                background: 'linear-gradient(45deg, #1a237e, #0d47a1)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                color: 'transparent',
                                mb: 1
                            }}
                        >
                            登录 Showtime
                        </Typography>
                        
                        <TextField
                            fullWidth
                            label="用户名"
                            variant="outlined"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            size="small"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '8px',
                                    backgroundColor: '#fff',
                                    '&:hover': {
                                        backgroundColor: '#fff',
                                        boxShadow: '0 0 0 1px rgba(25, 118, 210, 0.1)',
                                    },
                                    '&.Mui-focused': {
                                        backgroundColor: '#fff',
                                        boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.2)',
                                    }
                                }
                            }}
                        />
                        
                        <TextField
                            fullWidth
                            label="密码"
                            type="password" 
                            variant="outlined"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            size="small"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '8px',
                                    backgroundColor: '#fff',
                                    '&:hover': {
                                        backgroundColor: '#fff',
                                        boxShadow: '0 0 0 1px rgba(25, 118, 210, 0.1)',
                                    },
                                    '&.Mui-focused': {
                                        backgroundColor: '#fff',
                                        boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.2)',
                                    }
                                }
                            }}
                        />

                        <Box sx={{display: 'flex', gap: 1.5}}>
                            <Button
                                fullWidth
                                variant="contained"
                                onClick={() => config.login(username, password)}
                                sx={{
                                    height: 40,
                                    background: 'linear-gradient(45deg, #1a237e, #0d47a1)',
                                    textTransform: 'none',
                                    fontSize: '1rem',
                                    fontWeight: 500,
                                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                                    '&:hover': {
                                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                                    }
                                }}
                            >
                                登录
                            </Button>
                            {hide && (
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    onClick={hide}
                                    sx={{
                                        height: 40,
                                        textTransform: 'none',
                                        fontSize: '1rem',
                                        fontWeight: 500
                                    }}
                                >
                                    返回
                                </Button>
                            )}
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};
