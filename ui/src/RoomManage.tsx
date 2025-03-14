import React from 'react';
import {
    Box,
    Button,
    FormControlLabel,
    Paper,
    TextField,
    Typography,
    Switch,
    Container,
} from '@mui/material';
import {FCreateRoom} from './useRoom';
import {getRoomFromURL} from './useRoomID';
import {authModeToRoomMode, UseConfig} from './useConfig';
import VideocamIcon from '@mui/icons-material/Videocam';

export const RoomManage = ({room, config}: {room: FCreateRoom; config: UseConfig}) => {
    const [id, setId] = React.useState(() => getRoomFromURL() ?? config.roomName);
    const mode = authModeToRoomMode(config.authMode, config.loggedIn);
    const [ownerLeave, setOwnerLeave] = React.useState(config.closeRoomWhenOwnerLeaves);
    
    const handleCreateRoom = () =>
        room({
            type: 'create',
            payload: {
                mode,
                closeOnOwnerLeave: ownerLeave,
                joinIfExist: true,
                id: id || undefined,
            },
        });

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
            <Container maxWidth="sm">
                <Paper 
                    elevation={24}
                    sx={{
                        borderRadius: 4,
                        overflow: 'hidden',
                        background: 'rgba(255, 255, 255, 0.98)',
                        backdropFilter: 'blur(10px)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
                    }}
                >
                    <Box
                        sx={{
                            p: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 3
                        }}
                    >
                        <Box sx={{textAlign: 'center'}}>
                            <img 
                                src="./logo.svg" 
                                alt="Showtime" 
                                style={{
                                    width: 180,
                                    filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))'
                                }} 
                            />
                        </Box>

                        <Typography 
                            variant="h4" 
                            textAlign="center" 
                            sx={{
                                fontWeight: 700,
                                background: 'linear-gradient(45deg, #1a237e, #0d47a1)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                color: 'transparent',
                                mb: 2,
                                letterSpacing: '-0.5px',
                                fontSize: '2rem'
                            }}
                        >
                            创建或加入空间
                        </Typography>

                        <Box sx={{ width: '100%' }}>
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    mb: 1,
                                    fontWeight: 500,
                                    color: 'rgba(0, 0, 0, 0.7)',
                                    letterSpacing: '0.5px'
                                }}
                            >
                                空间 ID
                            </Typography>
                            <TextField
                                fullWidth
                                placeholder="请输入空间 ID"
                                variant="outlined"
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2,
                                        backgroundColor: '#fff',
                                        transition: 'all 0.2s',
                                        fontSize: '1.1rem',
                                        fontFamily: 'monospace',
                                        letterSpacing: '0.5px',
                                        '&:hover': {
                                            backgroundColor: '#fff',
                                            boxShadow: '0 0 0 1px rgba(25, 118, 210, 0.1)',
                                        },
                                        '&.Mui-focused': {
                                            backgroundColor: '#fff',
                                            boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.2)',
                                        }
                                    },
                                    '& .MuiOutlinedInput-input': {
                                        padding: '16px',
                                        fontWeight: 500,
                                        color: 'rgba(0, 0, 0, 0.7)',
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: 'rgba(0, 0, 0, 0.7)',
                                    },
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'rgba(0, 0, 0, 0.15)',
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'rgba(0, 0, 0, 0.3)',
                                    }
                                }}
                            />
                        </Box>

                        <Box sx={{ 
                            backgroundColor: 'rgba(0, 0, 0, 0.02)',
                            borderRadius: 2,
                            p: 2
                        }}>
                            <FormControlLabel
                                control={
                                    <Switch 
                                        checked={ownerLeave} 
                                        onChange={(e) => setOwnerLeave(e.target.checked)}
                                        sx={{
                                            '& .MuiSwitch-switchBase.Mui-checked': {
                                                color: '#1a237e',  // 开关按钮颜色
                                                '&:hover': {
                                                    backgroundColor: 'rgba(26, 35, 126, 0.08)',
                                                },
                                            },
                                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                                backgroundColor: '#1a237e',  // 轨道颜色
                                            },
                                        }}
                                    />
                                }
                                label={
                                    <Typography sx={{ 
                                        color: 'rgba(0, 0, 0, 0.7)',
                                        fontWeight: 500,
                                        letterSpacing: '0.3px',
                                        fontSize: '0.95rem'
                                    }}>
                                        离开时关闭空间
                                    </Typography>
                                }
                            />
                        </Box>

                        <Button
                            fullWidth
                            variant="contained"
                            size="large"
                            onClick={handleCreateRoom}
                            startIcon={<VideocamIcon />}
                            sx={{
                                mt: 2,
                                height: 56,
                                borderRadius: 2,
                                background: 'linear-gradient(45deg, #1a237e, #0d47a1)',
                                textTransform: 'none',
                                fontSize: '1.2rem',
                                fontWeight: 600,
                                letterSpacing: '1px',
                                color: '#fff',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
                                    background: 'linear-gradient(45deg, #1565C0, #1976D2)',
                                }
                            }}
                        >
                            进入空间
                        </Button>

                        {config.loggedIn && (
                            <Typography 
                                variant="body2" 
                                textAlign="center"
                                sx={{ 
                                    mt: 2,
                                    color: 'rgba(0, 0, 0, 0.6)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: 0.5,
                                    fontWeight: 500,
                                    letterSpacing: '0.3px'
                                }}
                            >
                                已登录为 <b style={{color: '#1a237e'}}>{config.user}</b>
                            </Typography>
                        )}
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};
