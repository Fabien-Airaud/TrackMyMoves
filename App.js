import { NavigationContainer } from '@react-navigation/native';

import HomeStack from './components/navigation/HomeStack';

const App = () => {
  return (
    <NavigationContainer>
      <HomeStack />
    </NavigationContainer>
  );
};

export default App;
