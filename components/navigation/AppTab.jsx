import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Move from '../move/Move';
import Profile from '../profile/Profile';
import { Image } from 'react-native';

const PlaceholderImageSource = require('../../assets/transparent-logo.png');

const Tab = createBottomTabNavigator();

const AppTab = () => {
    return (
        <Tab.Navigator screenOptions={{headerTitle: 'TrackMyMoves', headerLeft: () => <Image source={PlaceholderImageSource} style={{height: 50, width: 50, marginStart: 10}}/>}}>
            <Tab.Screen name="Move" component={Move} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
};

export default AppTab;