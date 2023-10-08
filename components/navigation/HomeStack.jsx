import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../homeScreen/HomeScreen';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default HomeStack;
