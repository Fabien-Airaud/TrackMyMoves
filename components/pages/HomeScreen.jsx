import { StyleSheet, View, Image, Text } from 'react-native';

const PlaceholderImageSource = require('../../assets/transparent-logo.png');

const HomeScreen = () => {
    return (
        <View style={styles.body}>
            <Text style={styles.brand}>TrackMyMoves</Text>
            <Image source={PlaceholderImageSource} style={styles.logo} resizeMethod='scale' />
            <View style={{ flexDirection: 'row' }}>
                <text style={styles.text}>Register</text>
                <text style={styles.text}>Log in</text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    body: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#191919'
    },
    brand: {
        color: '#e4e4e4',
        fontSize: 40
    },
    logo: {
        width: '100%',
        height: '50%',
        resizeMode: 'center'
    },
    text: {
        color: '#e4e4e4'
    }
});

export default HomeScreen;
