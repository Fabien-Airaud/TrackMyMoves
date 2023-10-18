import { useTheme } from '@react-navigation/native';
import { ScrollView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import DataProfile from './DataProfile';

const Profile = () => {
    // Logged account stored in redux
    const logAcc = useSelector((state) => state.logIn.account);

    // Style variables
    const colors = useTheme();
    const styles = StyleSheet.create({
        page: {
            minHeight: '100%',
            width: '100%',
            padding: '5%',
            backgroundColor: colors.background
        }
    });

    return (
        <ScrollView contentContainerStyle={{ alignItems: 'center' }} style={styles.page}>
            <DataProfile label='Email address' data={logAcc.emailAddress} secureTextEntry={false} inputMode='text' />
        </ScrollView>
    );
};

export default Profile;