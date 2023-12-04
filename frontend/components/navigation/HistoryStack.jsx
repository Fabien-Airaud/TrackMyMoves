import { createNativeStackNavigator } from '@react-navigation/native-stack';

import History from '../history/History';
import Informations from '../history/Informations';

const Stack = createNativeStackNavigator();

const HistoryStack = () => {
  return (
    <Stack.Navigator initialRouteName="History">
      <Stack.Screen name='History' component={History} options={{ headerShown: false }} />
      <Stack.Screen name='Informations' component={Informations} options={{ headerShown: true, title: "Activity informations" }} />
    </Stack.Navigator>
  );
};

export default HistoryStack;
