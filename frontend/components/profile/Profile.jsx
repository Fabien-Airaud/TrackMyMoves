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
import { removeAccount } from '../../redux/apiAccountSlice';

const Profile = () => {
    // Api variables
    // const apiUrl = process.env.EXPO_PUBLIC_API_URL

    // Logged account stored in redux
    // const logAcc = useSelector((state) => state.logIn);
    const apiAccount = useSelector((state) => state.apiAccount);

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

    const logOut = async () => {
        const logInFileURI = FileSystem.documentDirectory + 'logIn.json';
        const fileInfo = await FileSystem.getInfoAsync(logInFileURI);

        if (fileInfo.exists && !fileInfo.isDirectory) { // if log in file exists
            await FileSystem.deleteAsync(logInFileURI).catch(() => console.log('Failed to delete logInFile'));
        }

        fetch(apiUrl + "/logOut", {
            method: "GET",
            headers: {
                Authorization: "token " + apiAccount.token
            }
        })
            .then(response => {
                if (response.status === 200) dispatch(removeAccount());
                else console.log("Log out failed");
            })
            .catch(error => {
                console.error(error);
            });

        // dispatch(logOutAccount());
    }

    const dispatchLogOut = () => {
        Alert.alert(
            'Log out',
            'Are you sure you want to log out?',
            [
                { text: 'Log out', onPress: () => logOut() },
                { text: 'Cancel' }
            ],
            { cancelable: true }
        );
    };

    const deleteCurrentAccount = async () => {
        const dirAccountUri = FileSystem.documentDirectory + apiAccount.account.id;
        await FileSystem.deleteAsync(dirAccountUri, { idempotent: true });

        // dispatch(deleteAccount({ id: logAcc.id }));

        logOut();
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
            <FirstNameProfile id={apiAccount.account.id} data={apiAccount.account.first_name} />
            <LastNameProfile id={apiAccount.account.id} data={apiAccount.account.last_name} />
            <EmailProfile id={apiAccount.account.id} data={apiAccount.account.user.email} />
            <PasswordProfile id={apiAccount.account.id} />
            <BirthdateProfile id={apiAccount.account.id} data={new Date(apiAccount.account.birthdate)} />
            <HeightProfile id={apiAccount.account.id} data={"" + apiAccount.account.height} />
            <WeightProfile id={apiAccount.account.id} data={"" + apiAccount.account.weight} />
            <CountryProfile id={apiAccount.account.id} data={apiAccount.account.country} />
            {/* <Button title='Log out' onPress={() => dispatchLogOut()} size='md' radius='sm' color={colors.error} titleStyle={{ fontWeight: 'bold' }} containerStyle={styles.outButton} /> */}
            {/* <Button title='Delete account' onPress={() => dispatchDeleteAccount()} size='md' radius='sm' color={colors.error} titleStyle={{ fontWeight: 'bold' }} containerStyle={styles.outButton} /> */}
        </ScrollView>
    );
};

export default Profile;