import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';

import AppNav from './components/navigation/AppNav';
import store from './redux/store';

const myDarkTheme = {
  dark: false,
  colors: {
    primary: '#253BFF',
    background: '#191919',
    card: '#090909',
    surface: '#252525',
    text: '#E4E4E4',
    border: '#BBB',
    inputFill: '#393939',
    placeholder: '#999898',
    notification: '#01FD84',
    success: '#439946',
    error: '#BF2C24',
    warning: '#CFBE27'
  },
  fontSizes: {
    xs: 10,
    sm: 14,
    md: 20,
    lg: 28,
    xl: 40,
    medButton: 60,
    bigButton: 120
  }
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer theme={myDarkTheme}>
        <PaperProvider>
          <AppNav />
          <StatusBar style="auto" />
        </PaperProvider>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
