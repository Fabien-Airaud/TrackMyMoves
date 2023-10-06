import { StyleSheet, View, Image, Text } from 'react-native';

const PlaceholderImageSource = require('../assets/transparent-logo.png');

const HeaderBrand = () => {
    return (
        <View style={styles.header}>
            <Image source={PlaceholderImageSource} style={styles.logo} />
            <Text style={styles.brand}>TrackMyMoves</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        height: '10%',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '3%',
        backgroundColor: '#090909'
    },
    logo: {
        width: 40,
        height: 40,
        marginEnd: '2%'
    },
    brand: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#e4e4e4'
    },
});

export default HeaderBrand;
