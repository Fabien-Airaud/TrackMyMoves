import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import ActivityGeneral from '../history/ActivityGeneral';
import ActivityIntervals from '../history/ActivityIntervals';

const Tab = createMaterialTopTabNavigator();

const ActivityInformationsTopTab = ({ activity }) => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="General" component={ActivityGeneral} initialParams={activity} />
      <Tab.Screen name="Intervals" component={ActivityIntervals} initialParams={activity} />
    </Tab.Navigator>
  );
};

export default ActivityInformationsTopTab;
