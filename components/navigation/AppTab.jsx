import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Move from '../move/move';
import Profile from '../profile/Profile';

const Tab = createBottomTabNavigator();

const AppTab = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Move" component={Move} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
};

export default AppTab;