import { useTheme } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import * as FileSystem from 'expo-file-system';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { Checkbox, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import { logInAccount } from '../../redux/logInSlice';
import Helper from '../Helper';
import Input from '../Input';
import { checkAccount } from './CheckFonctions';

const LogInForm = () => {
    // Api variables
    const apiUrl = process.env.EXPO_PUBLIC_API_URL

    // Input variables
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [securedPassword, setSecuredPassword] = useState(true);
    const [rememberMe, setRememberMe] = useState(false);

    // Style variables
    const { colors } = useTheme();

    // Accounts stored in redux
    const accounts = useSelector((state) => state.accounts);

    // Disable function for the log in button
    const disableLogIn = () => {
        return (emailAddress == '') || (password == '');
    };

    const dispatch = useDispatch();

    // Dispatch the account to log in
    const dispatchLogIn = async (account, rememberMe) => {
        if (account === undefined) {
            alert('Log in failed, email or password not correct, please retry');
            return false;
        }

        fetch(apiUrl + "/logIn", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: account.emailAddress,
              password: account.password
            }),
        })
        .then(response => response.json())
        .then(json => {
            return console.log(JSON.stringify(json));
        })
        .catch(error => {
            console.error(error);
        });

        dispatch(logInAccount(account));

        if (rememberMe) {
            const logInFileURI = FileSystem.documentDirectory + 'logIn.json';
            await FileSystem.writeAsStringAsync(logInFileURI, account.id).catch(() => console.log('Failed to create logInFile'));
        }
        return true;
    };

    return (
        <View style={{ width: '80%' }}>
            <Input label='Email address' placeholder='Enter your email address' onChangeText={text => setEmailAddress(text)} inputMode='email' />
            <Input label='Password' placeholder='Enter your password' secureTextEntry={securedPassword} onChangeText={text => setPassword(text)} inputMode='text' right={<TextInput.Icon icon={securedPassword ? 'eye' : 'eye-off'} onPress={() => setSecuredPassword(!securedPassword)} color={colors.placeholder} />} />

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Checkbox status={rememberMe ? 'checked' : 'unchecked'} onPress={() => setRememberMe(!rememberMe)} color={colors.primary} />
                <Text style={{ color: colors.text }}>Remember me</Text>
            </View>

            <Button title='Log in' disabled={disableLogIn()} onPress={() => dispatchLogIn(checkAccount(accounts, emailAddress, password), rememberMe)} size='md' radius='sm' titleStyle={{ fontWeight: 'bold' }} disabledTitleStyle={{ color: colors.placeholder }} disabledStyle={{ backgroundColor: colors.inputFill }} containerStyle={{ marginHorizontal: '5%', marginTop: '5%' }} />
            <Helper visible={disableLogIn()} message='All the inputs should be correctly filled.' justifyContent='center' />
        </View>
    );
};

export default LogInForm;