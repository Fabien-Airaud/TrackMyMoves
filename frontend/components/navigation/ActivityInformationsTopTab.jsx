import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import ActivityCharts from '../history/ActivityCharts';
import ActivityGeneral from '../history/ActivityGeneral';
import ActivityIntervals from '../history/ActivityIntervals';

const Tab = createMaterialTopTabNavigator();

const ActivityInformationsTopTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="General" component={ActivityGeneral} />
      <Tab.Screen name="Intervals" component={ActivityIntervals} />
      <Tab.Screen name="Charts" component={ActivityCharts} />
    </Tab.Navigator>
  );
};

export default ActivityInformationsTopTab;
