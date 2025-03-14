import React, {useCallback, useState} from 'react';
import {Badge, IconButton, Paper, Tooltip, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import PresentToAllIcon from '@mui/icons-material/PresentToAll';
import FullScreenIcon from '@mui/icons-material/Fullscreen';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {useHotkeys} from 'react-hotkeys-hook';
import {Video} from './Video';
import makeStyles from '@mui/styles/makeStyles';
import {ConnectedRoom} from './useRoom';
import {useSnackbar} from 'notistack';
import {RoomUser} from './message';
import {useSettings, VideoDisplayMode} from './settings';
import {SettingDialog} from './SettingDialog';

const HostStream: unique symbol = Symbol('mystream');

const flags = (user: RoomUser) => {
    const result: string[] = [];
    if (user.you) {
        result.push('您');
    }
    if (user.owner) {
        result.push('房主');
    }
    if (user.streaming) {
        result.push('正在共享');
    }
    if (!result.length) {
        return '';
    }
    return ` (${result.join(', ')})`;
};

interface FullScreenHTMLVideoElement extends HTMLVideoElement {
    msRequestFullscreen?: () => void;
    mozRequestFullScreen?: () => void;
    webkitRequestFullscreen?: () => void;
}

const requestFullscreen = (element: FullScreenHTMLVideoElement | null) => {
    if (element?.requestFullscreen) {
        element.requestFullscreen();
    } else if (element?.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element?.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element?.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
};

export const Room = ({
    state,
    share,
    stopShare,
    setName,
    onExit,
}: {
    state: ConnectedRoom;
    share: () => void;
    stopShare: () => void;
    setName: (name: string) => void;
    onExit: () => void;
}) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const {enqueueSnackbar} = useSnackbar();
    const [settings, setSettings] = useSettings();
    const [showControl, setShowControl] = React.useState(true);
    const [hoverControl, setHoverControl] = React.useState(false);
    const [selectedStream, setSelectedStream] = React.useState<string | typeof HostStream>();
    const [videoElement, setVideoElement] = React.useState<FullScreenHTMLVideoElement | null>(null);
    const [exitDialogOpen, setExitDialogOpen] = useState(false);

    useShowOnMouseMovement(setShowControl);

    const handleFullscreen = useCallback(() => requestFullscreen(videoElement), [videoElement]);

    React.useEffect(() => {
        if (selectedStream === HostStream && state.hostStream) {
            return;
        }
        if (state.clientStreams.some(({id}) => id === selectedStream)) {
            return;
        }
        if (state.clientStreams.length === 0 && selectedStream) {
            setSelectedStream(undefined);
            return;
        }
        setSelectedStream(state.clientStreams[0]?.id);
    }, [state.clientStreams, selectedStream, state.hostStream]);

    const stream =
        selectedStream === HostStream
            ? state.hostStream
            : state.clientStreams.find(({id}) => selectedStream === id)?.stream;

    React.useEffect(() => {
        if (videoElement && stream) {
            videoElement.srcObject = stream;
            videoElement.play().catch((e) => console.log('Could not play main video', e));
        }
    }, [videoElement, stream]);

    const copyLink = () => {
        navigator?.clipboard?.writeText(window.location.href)?.then(
            () => enqueueSnackbar('Link Copied', {variant: 'success'}),
            (err) => enqueueSnackbar('Copy Failed ' + err, {variant: 'error'})
        );
    };

    const setHoverState = React.useMemo(
        () => ({
            onMouseLeave: () => setHoverControl(false),
            onMouseEnter: () => setHoverControl(true),
        }),
        [setHoverControl]
    );

    const controlVisible = showControl || open || hoverControl;

    useHotkeys('s', () => (state.hostStream ? stopShare() : share()), [state.hostStream]);
    useHotkeys(
        'f',
        () => {
            if (selectedStream) {
                handleFullscreen();
            }
        },
        [handleFullscreen, selectedStream]
    );
    useHotkeys('c', copyLink);
    useHotkeys(
        'h',
        () => {
            if (state.clientStreams !== undefined && state.clientStreams.length > 0) {
                const currentStreamIndex = state.clientStreams.findIndex(
                    ({id}) => id === selectedStream
                );
                const nextIndex =
                    currentStreamIndex === state.clientStreams.length - 1
                        ? 0
                        : currentStreamIndex + 1;
                setSelectedStream(state.clientStreams[nextIndex].id);
            }
        },
        [state.clientStreams, selectedStream]
    );
    useHotkeys(
        'l',
        () => {
            if (state.clientStreams !== undefined && state.clientStreams.length > 0) {
                const currentStreamIndex = state.clientStreams.findIndex(
                    ({id}) => id === selectedStream
                );
                const previousIndex =
                    currentStreamIndex === 0
                        ? state.clientStreams.length - 1
                        : currentStreamIndex - 1;
                setSelectedStream(state.clientStreams[previousIndex].id);
            }
        },
        [state.clientStreams, selectedStream]
    );

    const videoClasses = () => {
        switch (settings.displayMode) {
            case VideoDisplayMode.FitToWindow:
                return `${classes.video} ${classes.videoWindowFit}`;
            case VideoDisplayMode.OriginalSize:
                return `${classes.video}`;
            case VideoDisplayMode.FitWidth:
                return `${classes.video} ${classes.videoWindowWidth}`;
            case VideoDisplayMode.FitHeight:
                return `${classes.video} ${classes.videoWindowHeight}`;
        }
    };

    return (
        <div className={classes.videoContainer}>
            <Button
                variant="contained"
                color="error"
                className={classes.exitButton}
                onClick={() => setExitDialogOpen(true)}
                startIcon={<ExitToAppIcon />}
            >
                退出空间
            </Button>

            <Dialog
                open={exitDialogOpen}
                onClose={() => setExitDialogOpen(false)}
            >
                <DialogTitle>确认退出</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        确定要退出当前空间吗？
                        {state.hostStream && ' 您的屏幕共享将会停止。'}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button 
                        onClick={() => setExitDialogOpen(false)}
                        color="inherit"
                    >
                        取消
                    </Button>
                    <Button
                        onClick={() => {
                            if (state.hostStream) {
                                stopShare();
                            }
                            onExit();
                        }}
                        color="error"
                        autoFocus
                    >
                        确认退出
                    </Button>
                </DialogActions>
            </Dialog>

            {controlVisible && (
                <Paper className={classes.control} elevation={10} {...setHoverState}>
                    {state.hostStream ? (
                        <Tooltip title="取消演示" arrow>
                            <IconButton onClick={stopShare} size="large">
                                <CancelPresentationIcon fontSize="large" />
                            </IconButton>
                        </Tooltip>
                    ) : (
                        <Tooltip title="开始演示" arrow>
                            <IconButton onClick={share} size="large">
                                <PresentToAllIcon fontSize="large" />
                            </IconButton>
                        </Tooltip>
                    )}

                    <Tooltip
                        classes={{tooltip: classes.noMaxWidth}}
                        title={
                            <div>
                                <Typography variant="h5">成员列表</Typography>
                                {state.users.map((user) => (
                                    <Typography key={user.id}>
                                        {user.name} {flags(user)}
                                    </Typography>
                                ))}
                            </div>
                        }
                        arrow
                    >
                        <Badge badgeContent={state.users.length} color="primary">
                            <PeopleIcon fontSize="large" />
                        </Badge>
                    </Tooltip>

                    <Tooltip title="全屏" arrow>
                        <IconButton
                            onClick={handleFullscreen}
                            disabled={!selectedStream}
                            size="large"
                        >
                            <FullScreenIcon fontSize="large" />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="设置" arrow>
                        <IconButton onClick={() => setOpen(true)} size="large">
                            <SettingsIcon fontSize="large" />
                        </IconButton>
                    </Tooltip>
                </Paper>
            )}

            {stream ? (
                <video
                    muted
                    ref={setVideoElement}
                    className={videoClasses()}
                    onDoubleClick={handleFullscreen}
                />
            ) : (
                <Paper 
                    elevation={0}
                    className={classes.noStreamContainer}
                >
                    <Typography
                        variant="h4"
                        className={classes.noStreamText}
                    >
                        暂无演示画面
                    </Typography>
                </Paper>
            )}

            <div className={classes.bottomContainer}>
                {state.clientStreams
                    .filter(({id}) => id !== selectedStream)
                    .map((client) => {
                        return (
                            <Paper
                                key={client.id}
                                elevation={4}
                                className={classes.smallVideoContainer}
                                onClick={() => setSelectedStream(client.id)}
                            >
                                <Video
                                    key={client.id}
                                    src={client.stream}
                                    className={classes.smallVideo}
                                />
                                <Typography
                                    variant="subtitle1"
                                    component="div"
                                    align="center"
                                    className={classes.smallVideoLabel}
                                >
                                    {state.users.find(({id}) => client.peer_id === id)?.name ??
                                        'unknown'}
                                </Typography>
                            </Paper>
                        );
                    })}
                {state.hostStream && selectedStream !== HostStream && (
                    <Paper
                        elevation={4}
                        className={classes.smallVideoContainer}
                        onClick={() => setSelectedStream(HostStream)}
                    >
                        <Video src={state.hostStream} className={classes.smallVideo} />
                        <Typography
                            variant="subtitle1"
                            component="div"
                            align="center"
                            className={classes.smallVideoLabel}
                        >
                            您
                        </Typography>
                    </Paper>
                )}
                <SettingDialog
                    open={open}
                    setOpen={setOpen}
                    updateName={setName}
                    saveSettings={setSettings}
                />
            </div>
        </div>
    );
};

const useShowOnMouseMovement = (doShow: (s: boolean) => void) => {
    const timeoutHandle = React.useRef(0);

    React.useEffect(() => {
        const update = () => {
            if (timeoutHandle.current === 0) {
                doShow(true);
            }

            clearTimeout(timeoutHandle.current);
            timeoutHandle.current = window.setTimeout(() => {
                timeoutHandle.current = 0;
                doShow(false);
            }, 1000);
        };
        window.addEventListener('mousemove', update);
        return () => window.removeEventListener('mousemove', update);
    }, [doShow]);

    React.useEffect(
        () =>
            void (timeoutHandle.current = window.setTimeout(() => {
                timeoutHandle.current = 0;
                doShow(false);
            }, 1000)),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );
};

const useStyles = makeStyles(() => ({
    videoContainer: {
        position: 'relative',
        width: '100vw',
        height: '100vh',
        backgroundColor: '#000',
        overflow: 'hidden'
    },
    video: {
        width: '100%',
        height: '100%',
        objectFit: 'contain'
    },
    videoWindowFit: {
        objectFit: 'contain'
    },
    videoWindowWidth: {
        width: '100%',
        height: 'auto'
    },
    videoWindowHeight: {
        width: 'auto',
        height: '100%'
    },
    title: {
        position: 'absolute',
        top: 32,
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '12px 24px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(12px)',
        borderRadius: 12,
        color: '#fff'
    },
    control: {
        position: 'absolute',
        bottom: 32,
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '12px 24px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(12px)',
        borderRadius: 12,
        display: 'flex',
        gap: 16,
        alignItems: 'center',
        color: '#fff'
    },
    noMaxWidth: {
        maxWidth: 'none'
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 120,
        right: 32,
        display: 'flex',
        flexDirection: 'column',
        gap: 16
    },
    smallVideo: {
        width: '100%',
        height: 'auto'
    },
    smallVideoLabel: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '4px',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: '#fff'
    },
    exitButton: {
        position: 'fixed',
        top: 20,
        right: 20,
        zIndex: 9999,
        backgroundColor: '#f44336 !important',
        color: '#fff !important',
        padding: '8px 16px !important',
        '&:hover': {
            backgroundColor: '#d32f2f !important',
            transform: 'scale(1.05)',
        },
        transition: 'all 0.2s ease-in-out',
    },
    smallVideoContainer: {
        position: 'relative',
        width: 240,
        height: 135,
        borderRadius: 12,
        overflow: 'hidden',
        cursor: 'pointer',
        '&:hover': {
            transform: 'scale(1.05)',
            transition: 'transform 0.2s'
        }
    },
    noStreamContainer: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '32px 48px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(12px)',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        animation: '$fadeIn 0.5s ease-out',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            transform: 'translate(-50%, -50%) scale(1.02)',
        }
    },
    '@keyframes fadeIn': {
        from: {
            opacity: 0,
            transform: 'translate(-50%, -50%) scale(0.9)',
        },
        to: {
            opacity: 1,
            transform: 'translate(-50%, -50%) scale(1)',
        }
    },
    noStreamText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 500,
        textShadow: '0 2px 4px rgba(0,0,0,0.2)',
    },
}));
