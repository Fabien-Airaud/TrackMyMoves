import { useTheme } from '@react-navigation/native';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';

const ActivityCharts = () => {
    // Activity infos stored in redux
    const activity = useSelector((state) => state.apiActivityInfos);

    // Style variables
    const { colors, fontSizes } = useTheme();
    const styles = StyleSheet.create({
        page: {
            minHeight: '100%',
            width: '100%',
            backgroundColor: colors.background
        },
        text: {
            color: colors.text,
            fontSize: fontSizes.md
        }
    });

    return (
        <ScrollView style={styles.page}>
            <Text style={styles.text}>{JSON.stringify(activity)}</Text>
        </ScrollView>
    );
};

export default ActivityCharts;