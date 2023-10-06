import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import HeaderBrand from './components/HeaderBrand';

const App = () => {
  return (
    <View style={styles.body}>
      <HeaderBrand />
      <View style={{height: '80%'}}></View>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    height: '100%',
    width: '100%',
    backgroundColor: '#191919'
  }
});

export default App;
