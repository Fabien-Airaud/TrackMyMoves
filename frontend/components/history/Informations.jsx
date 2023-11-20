import { useTheme } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';

import ActivityInformationsTopTab from '../navigation/ActivityInformationsTopTab';

const Informations = ({ navigation, route: { params: { activity } } }) => {
    // Style variables
    const { colors, fontSizes } = useTheme();
    const styles = StyleSheet.create({
        page: {
            minHeight: '100%',
            width: '100%',
            backgroundColor: colors.card
        },
        text: {
            textAlign: 'center',
            margin: 10,
            color: colors.text,
            fontSize: fontSizes.md
        }
    });

    return (
        <View style={styles.page}>
            {/* <Text style={styles.text}>Activity informations</Text> */}
            <ActivityInformationsTopTab activity={activity} />
        </View>
    );
};

export default Informations;