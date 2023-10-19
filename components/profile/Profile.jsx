import { useTheme } from '@react-navigation/native';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';

import DataProfile from './DataProfile';
import EmailProfile from './EmailProfile';

const Profile = () => {
    // Logged account stored in redux
    const logAcc = useSelector((state) => state.logIn.account);

    // Style variables
    const { colors } = useTheme();
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
            <DataProfile label='First name' data={logAcc.firstName} secureTextEntry={false} inputMode='text' />
            <DataProfile label='Last name' data={logAcc.lastName} secureTextEntry={false} inputMode='text' />
            <EmailProfile id={logAcc.id} data={logAcc.emailAddress} />
            <DataProfile label='Password' data={logAcc.password} secureTextEntry={true} inputMode='text' />
            <DataProfile label='Birthdate' data={logAcc.birthdate} secureTextEntry={false} inputMode='text' />
            <DataProfile label='Height (cm)' data={logAcc.height} secureTextEntry={false} inputMode='numeric' />
            <DataProfile label='Weight (kg)' data={logAcc.weight} secureTextEntry={false} inputMode='decimal' />
            <DataProfile label='Country' data={logAcc.country} secureTextEntry={false} inputMode='text' />
            <Text style={{color: colors.text}}> {logAcc.emailAddress} </Text>
        </ScrollView>
    );
};

export default Profile;