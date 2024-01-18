import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IconButton } from 'react-native-paper';

import { Image } from 'react-native';
import HistoryStack from './HistoryStack';
import Move from '../move/Move';
import Profile from '../profile/Profile';
import AIModel from '../aiModel/AIModel';

const PlaceholderImageSource = require('../../assets/transparent-logo.png');

const Tab = createBottomTabNavigator();

const MoveIcon = ({ focused, color, size }) => {
    return (
        <IconButton icon='map-marker-plus' focused={focused} iconColor={color} size={size} />
    );
};

const HistoryIcon = ({ focused, color, size }) => {
    return (
        <IconButton icon='history' focused={focused} iconColor={color} size={size} />
    );
};

const AIModelIcon = ({ focused, color, size }) => {
    return (
        <IconButton icon='microchip-ai' focused={focused} iconColor={color} size={size} />
    );
};

const ProfileIcon = ({ focused, color, size }) => {
    return (
        <IconButton icon='account-edit' focused={focused} iconColor={color} size={size} />
    );
};

const AppTab = () => {
    return (
        <Tab.Navigator screenOptions={{ headerTitle: 'TrackMyMoves', headerLeft: () => <Image source={PlaceholderImageSource} style={{ height: 50, width: 50, marginStart: 10 }} /> }}>
            <Tab.Screen name="Move" component={Move} options={{ tabBarIcon: MoveIcon }} />
            <Tab.Screen name="HistoryStack" component={HistoryStack} options={{ tabBarIcon: HistoryIcon, title: "History"}} />
            <Tab.Screen name="AIModel" component={AIModel} options={{ tabBarIcon: AIModelIcon, title: "AI model"}} />
            <Tab.Screen name="Profile" component={Profile} options={{ tabBarIcon: ProfileIcon }} />
        </Tab.Navigator>
    );
};

export default AppTab;