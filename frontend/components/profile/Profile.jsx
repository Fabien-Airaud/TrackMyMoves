import { useTheme } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import * as FileSystem from 'expo-file-system';
import { Alert, ScrollView, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { removeAccount } from '../../redux/apiAccountSlice';
import { logOutAPI, deleteAccountAPI } from '../APIFunctions';
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
    const apiAccount = useSelector((state) => state.apiAccount);

    // Style variables
    const { colors } = useTheme();
    const styles = StyleSheet.create({
        page: {
            minHeight: '100%',
            width: '100%',
            paddingHorizontal: '5%',
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

    const logOut = async () => {
        logOutAPI(apiAccount.token)
            .then(async message => {
                if (message) console.log(message);
                else {
                    const logInFileURI = FileSystem.documentDirectory + 'logIn.json';
                    const fileInfo = await FileSystem.getInfoAsync(logInFileURI);

                    if (fileInfo.exists && !fileInfo.isDirectory) { // if logIn file exists
                        await FileSystem.deleteAsync(logInFileURI, { idempotent: true }).catch(() => console.log('Failed to delete logIn file'));
                    }

                    // Remove account in redux store
                    dispatch(removeAccount());
                }
            })
            .catch(console.error);
    }

    const dispatchLogOut = () => {
        Alert.alert(
            'Log out',
            'Are you sure you want to log out?',
            [
                { text: 'Log out', onPress: logOut },
                { text: 'Cancel' }
            ],
            { cancelable: true }
        );
    };

    const deleteCurrentAccount = async () => {
        deleteAccountAPI(apiAccount.token, apiAccount.account.id)
            .then(async message => {
                if (message) console.log(message);
                else {
                    const dirAccountUri = FileSystem.documentDirectory + apiAccount.account.id;
                    await FileSystem.deleteAsync(dirAccountUri, { idempotent: true });

                    // Remove account in redux store
                    dispatch(removeAccount());
                }
            })
            .catch(console.error);
    }

    const dispatchDeleteAccount = () => {
        Alert.alert(
            'Delete account',
            'Are you sure you want to delete your account?',
            [
                { text: 'Delete', onPress: deleteCurrentAccount },
                { text: 'Cancel' }
            ],
            { cancelable: true }
        );
    };

    return (
        <ScrollView contentContainerStyle={{ alignItems: 'center' }} style={styles.page}>
            <FirstNameProfile/>
            <LastNameProfile id={apiAccount.account.id} data={apiAccount.account.last_name} />
            <EmailProfile id={apiAccount.account.id} data={apiAccount.account.user.email} />
            <PasswordProfile id={apiAccount.account.id} />
            <BirthdateProfile id={apiAccount.account.id} data={new Date(apiAccount.account.birthdate)} />
            <HeightProfile id={apiAccount.account.id} data={"" + apiAccount.account.height} />
            <WeightProfile id={apiAccount.account.id} data={"" + apiAccount.account.weight} />
            <CountryProfile id={apiAccount.account.id} data={apiAccount.account.country} />
            <Button title='Log out' onPress={dispatchLogOut} size='md' radius='sm' color={colors.error} titleStyle={{ fontWeight: 'bold' }} containerStyle={styles.outButton} />
            <Button title='Delete account' onPress={dispatchDeleteAccount} size='md' radius='sm' color={colors.error} titleStyle={{ fontWeight: 'bold' }} containerStyle={[styles.outButton, {marginBottom: '2%'}]} />
        </ScrollView>
    );
};

export default Profile;