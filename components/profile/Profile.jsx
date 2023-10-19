import { useTheme } from '@react-navigation/native';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';

import DataProfile from './DataProfile';
import FirstNameProfile from './FirstNameProfile';
import LastNameProfile from './LastNameProfile';
import EmailProfile from './EmailProfile';
import PasswordProfile from './PasswordProfile';
import CountryProfile from './CountryProfile';

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
            <FirstNameProfile id={logAcc.id} data={logAcc.firstName} />
            <LastNameProfile id={logAcc.id} data={logAcc.lastName} />
            <EmailProfile id={logAcc.id} data={logAcc.emailAddress} />
            <PasswordProfile id={logAcc.id} data={logAcc.password} />
            <DataProfile label='Birthdate' data={logAcc.birthdate} secureTextEntry={false} inputMode='text' />
            <DataProfile label='Height (cm)' data={logAcc.height} secureTextEntry={false} inputMode='numeric' />
            <DataProfile label='Weight (kg)' data={logAcc.weight} secureTextEntry={false} inputMode='decimal' />
            <CountryProfile id={logAcc.id} data={logAcc.country} />
            <Text style={{color: colors.text}}> {logAcc.emailAddress} </Text>
            <Text style={{color: colors.text}}> {logAcc.password} </Text>
            <Text style={{color: colors.text}}> {logAcc.firstName} </Text>
            <Text style={{color: colors.text}}> {logAcc.lastName} </Text>
            <Text style={{color: colors.text}}> {logAcc.birthdate} </Text>
            <Text style={{color: colors.text}}> {logAcc.height} </Text>
            <Text style={{color: colors.text}}> {logAcc.weight} </Text>
            <Text style={{color: colors.text}}> {logAcc.country} </Text>
        </ScrollView>
    );
};

export default Profile;