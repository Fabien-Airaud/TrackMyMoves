import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';

import HomeStack from './components/navigation/HomeStack';
import store from './redux/store';

const myDarkTheme = {
  dark: false,
  colors: {
    primary: '#253BFF',
    background: '#191919',
    card: '#090909',
    text: '#E4E4E4',
    border: '#BBB',
    inputFill: '#393939',
    placeholder: '#999898',
    notification: '#01FD84',
    success: '#439946',
    warning: '#BF2C24',
    error: '#CFBE27'
  },
  fontSizes: {
    xs: 10,
    sm: 14,
    md: 20,
    lg: 28,
    xl: 40
  }
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer theme={myDarkTheme}>
          <HomeStack />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
