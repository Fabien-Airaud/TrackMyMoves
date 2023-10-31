import { useTheme } from '@react-navigation/native';
import { ScrollView, StyleSheet, Text } from 'react-native';

const History = () => {
    // Style variables
    const { colors, fontsizes } = useTheme();
    const styles = StyleSheet.create({
        page: {
            minHeight: '100%',
            width: '100%',
            padding: '5%',
            backgroundColor: colors.background
        }
    });

    return (
        <ScrollView style={styles.page}>
            <Text> History </Text>
        </ScrollView>
    );
};

export default History;