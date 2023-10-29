import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IconButton } from 'react-native-paper';

import { Image } from 'react-native';
import Move from '../move/Move';
import Profile from '../profile/Profile';
import SensorLocation from '../sensors/SensorLocation';

const PlaceholderImageSource = require('../../assets/transparent-logo.png');

const Tab = createBottomTabNavigator();

const MoveIcone = ({ focused, color, size }) => {
    return (
        <IconButton icon='map-marker-plus' focused={focused} iconColor={color} size={size} />
    );
};

const Sensors = ({ focused, color, size }) => {
    return (
        <IconButton icon='motion-sensor' focused={focused} iconColor={color} size={size} />
    );
};

const ProfileIcone = ({ focused, color, size }) => {
    return (
        <IconButton icon='account-edit' focused={focused} iconColor={color} size={size} />
    );
};

const AppTab = () => {
    return (
        <Tab.Navigator screenOptions={{ headerTitle: 'TrackMyMoves', headerLeft: () => <Image source={PlaceholderImageSource} style={{ height: 50, width: 50, marginStart: 10 }} /> }}>
            <Tab.Screen name="Move" component={Move} options={{ tabBarIcon: MoveIcone }} />
            <Tab.Screen name="Sensors" component={SensorLocation} options={{ tabBarIcon: Sensors }} />
            <Tab.Screen name="Profile" component={Profile} options={{ tabBarIcon: ProfileIcone }} />
        </Tab.Navigator>
    );
};

export default AppTab;