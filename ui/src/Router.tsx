import {RoomManage} from './RoomManage';
import {useRoom} from './useRoom';
import {Room} from './Room';
import {UseConfig, useConfig} from './useConfig';

export const Router = () => {
    const config = useConfig();

    if (config.loading) {
        // show spinner
        return null;
    }
    return <RouterLoadedConfig config={config} />;
};

const RouterLoadedConfig = ({config}: {config: UseConfig}) => {
    const {room, state, exitRoom, ...other} = useRoom(config);

    if (state) {
        return <Room state={state} onExit={exitRoom} {...other} />;
    }

    return <RoomManage room={room} config={config} />;
};
