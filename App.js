import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

const App = () => {
  return (
    <View style={styles.body}>
      <Text style={styles.brand}>TrackMyMoves</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    height: '100%',
    width: '100%',
    backgroundColor: '#191919'
  },
  brand: {
    color: '#e4e4e4'
  },
});

export default App;
