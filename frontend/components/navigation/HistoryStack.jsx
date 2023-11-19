import { createNativeStackNavigator } from '@react-navigation/native-stack';

import History from '../history/History';
import Informations from '../history/Informations'
import ActivityTypes from '../move/ActivityTypes';

const Stack = createNativeStackNavigator();

const HistoryStack = () => {
  const getHeaderTitle = (activity) => {
    const activityType = ActivityTypes.find((activityType) => activityType.value == activity.activityType);
    
    return activityType ? activityType.label : "Activity informations"
  }

  return (
    <Stack.Navigator initialRouteName="History">
      <Stack.Screen name='History' component={History} options={{ headerShown: false }} />
      <Stack.Screen name='Informations' component={Informations} options={({route}) => ({ headerShown: true, title: getHeaderTitle(route.params.activity) })} />
    </Stack.Navigator>
  );
};

export default HistoryStack;
