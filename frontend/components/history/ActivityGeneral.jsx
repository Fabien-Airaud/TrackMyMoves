import { useTheme } from '@react-navigation/native';
import { ScrollView, StyleSheet, Text } from 'react-native';

const ActivityGeneral = ({ navigation, route: { params: { activity } } }) => {
    // Style variables
    const { colors, fontSizes } = useTheme();
    const styles = StyleSheet.create({
        page: {
            minHeight: '100%',
            width: '100%',
            padding: '5%',
            backgroundColor: colors.background
        },
        text: {
            textAlign: 'center',
            margin: 10,
            color: colors.text,
            fontSize: fontSizes.sm
        }
    });

    return (
        <ScrollView style={styles.page}>
            <Text style={styles.text}>{JSON.stringify(activity)}</Text>
        </ScrollView>
    );
};

export default ActivityGeneral;