import { StyleSheet, Text, View } from 'react-native';

const HeaderBrand = () => {
    return (
        <View style={styles.header}>
            <Text style={styles.brand}>TrackMyMoves</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
      height: '10%',
      width: '100%',
      justifyContent: 'center',
      padding: '3%',
      backgroundColor: '#090909'
    },
    brand: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#e4e4e4'
    },
  });
  
  export default HeaderBrand;
