import { useTheme } from '@react-navigation/native';
import { Image, StyleSheet, Text, View } from 'react-native';

import RegLogButtons from './RegLogButtons';

const PlaceholderImageSource = require('../../assets/transparent-logo.png');

const HomeScreen = ({ navigation }) => {
    const { colors, fontSizes } = useTheme();

    return (
        <View style={styles.page}>
            <Text style={[styles.brand, { color: colors.text, fontSize: fontSizes.xl }]}>TrackMyMoves</Text>
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
    },
    brand: {
        fontWeight: 'bold'
    },
    logo: {
        width: '100%',
        height: '50%',
        resizeMode: 'center'
    }
});

export default HomeScreen;
