import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../homeScreen/HomeScreen';
import Register from '../register/Register';
import LogIn from '../logIn/LogIn';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name='Home' component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name='Register' component={Register} />
      <Stack.Screen name='LogIn' component={LogIn} options={{headerTitle: 'Log in'}} />
    </Stack.Navigator>
  );
};

export default HomeStack;
