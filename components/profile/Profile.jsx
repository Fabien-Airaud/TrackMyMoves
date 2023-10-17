import { useTheme } from '@react-navigation/native';
import { ScrollView, StyleSheet, Text } from 'react-native';

const Profile = () => {
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
            color: colors.text,
            fontSize: fontSizes.sm
        }
    });

    return (
        <ScrollView contentContainerStyle={{ alignItems: 'center' }} style={styles.page}>
            <Text style={styles.text}> Profile screen </Text>
        </ScrollView>
    );
};

export default Profile;