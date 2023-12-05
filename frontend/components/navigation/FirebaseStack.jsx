import { createNativeStackNavigator } from '@react-navigation/native-stack';

import FirebaseHomeScreen from '../firebaseHomeScreen/HomeScreen';

const Stack = createNativeStackNavigator();

const FirebaseStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name='FirebaseHome' component={FirebaseHomeScreen} />
    </Stack.Navigator>
  );
};

export default FirebaseStack;
