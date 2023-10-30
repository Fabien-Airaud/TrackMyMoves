import { useTheme } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import * as FileSystem from 'expo-file-system';
import { Alert, ScrollView, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { deleteAccount } from '../../redux/accountSlice';
import { logOutAccount } from '../../redux/logInSlice';
import BirthdateProfile from './BirthdateProfile';
import CountryProfile from './CountryProfile';
import EmailProfile from './EmailProfile';
import FirstNameProfile from './FirstNameProfile';
import HeightProfile from './HeightProfile';
import LastNameProfile from './LastNameProfile';
import PasswordProfile from './PasswordProfile';
import WeightProfile from './WeightProfile';

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
        },
        outButton: {
            width: '60%',
            marginHorizontal: '5%',
            marginTop: '5%'
        }
    });

    // Dispatch account
    const dispatch = useDispatch();

    const dispatchLogOut = () => {
        Alert.alert(
            'Log out',
            'Are you sure you want to log out?',
            [
                { text: 'Log out', onPress: () => dispatch(logOutAccount()) },
                { text: 'Cancel' }
            ],
            { cancelable: true }
        );
    };

    const deleteCurrentAccount = async () => {
        const dirAccountUri = FileSystem.documentDirectory + logAcc.id;
        await FileSystem.deleteAsync(dirAccountUri, { idempotent: true }).then( // If account directory doesn't exist, do not throw an error
            () => console.log('Account directory deleted')
        );

        dispatch(deleteAccount({ id: logAcc.id }));
        dispatch(logOutAccount());
    }

    const dispatchDeleteAccount = () => {
        Alert.alert(
            'Delete account',
            'Are you sure you want to delete your account?',
            [
                {
                    text: 'Delete',
                    onPress: async () => await deleteCurrentAccount()
                },
                { text: 'Cancel' }
            ],
            { cancelable: true }
        );
    };

    return (
        <ScrollView contentContainerStyle={{ alignItems: 'center' }} style={styles.page}>
            <FirstNameProfile id={logAcc.id} data={logAcc.firstName} />
            <LastNameProfile id={logAcc.id} data={logAcc.lastName} />
            <EmailProfile id={logAcc.id} data={logAcc.emailAddress} />
            <PasswordProfile id={logAcc.id} data={logAcc.password} />
            <BirthdateProfile id={logAcc.id} data={logAcc.birthdate} />
            <HeightProfile id={logAcc.id} data={logAcc.height} />
            <WeightProfile id={logAcc.id} data={logAcc.weight} />
            <CountryProfile id={logAcc.id} data={logAcc.country} />
            <Button title='Log out' onPress={() => dispatchLogOut()} size='md' radius='sm' color={colors.error} titleStyle={{ fontWeight: 'bold' }} containerStyle={styles.outButton} />
            <Button title='Delete account' onPress={() => dispatchDeleteAccount()} size='md' radius='sm' color={colors.error} titleStyle={{ fontWeight: 'bold' }} containerStyle={styles.outButton} />
        </ScrollView>
    );
};

export default Profile;