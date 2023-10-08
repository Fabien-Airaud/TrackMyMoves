import { ThemeProvider } from '@rneui/themed';
import { NavigationContainer } from '@react-navigation/native';

import DefaultTheme from './DefaultTheme';
import HomeStack from './components/navigation/HomeStack';

const App = () => {
  return (
    <ThemeProvider theme={DefaultTheme}>
      <NavigationContainer>
        <HomeStack />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
