import { StyleSheet, View, Image, Text } from 'react-native';

import DefaultTheme from '../../DefaultTheme';

const PlaceholderImageSource = require('../../assets/transparent-logo.png');

const HomeScreen = () => {
    return (
        <View style={styles.page}>
            <Text style={styles.brand}>TrackMyMoves</Text>
            <Image source={PlaceholderImageSource} style={styles.logo} resizeMethod='scale' />
            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.text}>Register</Text>
                <Text style={styles.text}>Log in</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    page: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: DefaultTheme.darkColors.background
    },
    brand: {
        color: DefaultTheme.darkColors.black,
        fontSize: DefaultTheme.spacing.xl
    },
    logo: {
        width: '100%',
        height: '50%',
        resizeMode: 'center'
    },
    text: {
        color: DefaultTheme.darkColors.black,
    }
});

export default HomeScreen;
