import { Image, StyleSheet, Text, View } from 'react-native';

import DefaultTheme from '../../DefaultTheme';
import RegLogButtons from './RegLogButtons';

const PlaceholderImageSource = require('../../assets/transparent-logo.png');

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.page}>
            <Text style={styles.brand}>TrackMyMoves</Text>
            <Image source={PlaceholderImageSource} style={styles.logo} resizeMethod='scale' />
            <RegLogButtons navigation={navigation} />
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
        fontSize: DefaultTheme.spacing.xl,
        fontWeight: 'bold'
    },
    logo: {
        width: '100%',
        height: '50%',
        resizeMode: 'center'
    }
});

export default HomeScreen;
