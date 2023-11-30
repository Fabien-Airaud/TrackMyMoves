import { useTheme } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import * as FileSystem from 'expo-file-system';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { Checkbox, TextInput } from 'react-native-paper';
import { useDispatch } from 'react-redux';

import { newAccount } from '../../redux/apiAccountSlice';
import { logInAPI } from '../APIFunctions';
import Helper from '../Helper';
import Input from '../Input';

const LogInForm = () => {
    // Input variables
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [securedPassword, setSecuredPassword] = useState(true);
    const [rememberMe, setRememberMe] = useState(false);
    const [helpers, setHelpers] = useState(undefined);

    // Style variables
    const { colors } = useTheme();


    // Disable function for the log in button
    const disableLogIn = () => {
        return (email == '') || (password == '');
    };

    const dispatch = useDispatch();

    const logIn = () => {
        logInAPI(email, password)
            .then(data => {
                if (data.ok) {
                    setHelpers(undefined);
                    dispatch(newAccount(data.ok));

                    if (rememberMe) {
                        const logInFileURI = FileSystem.documentDirectory + 'logIn.json';
                        FileSystem.writeAsStringAsync(logInFileURI, data.ok.token).catch(() => console.log('Failed to create logIn file'));
                    }
                }
                else {
                    setHelpers(data.helpers);
                }
            })
            .catch(console.error);
    };

    return (
        <View style={{ width: '80%' }}>
            <Input label='Email address' placeholder='Enter your email address' onChangeText={text => setEmail(text)} inputMode='email' />
            <Input label='Password' placeholder='Enter your password' secureTextEntry={securedPassword} onChangeText={text => setPassword(text)} inputMode='text' right={<TextInput.Icon icon={securedPassword ? 'eye' : 'eye-off'} onPress={() => setSecuredPassword(!securedPassword)} color={colors.placeholder} />} />

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Checkbox status={rememberMe ? 'checked' : 'unchecked'} onPress={() => setRememberMe(!rememberMe)} color={colors.primary} />
                <Text style={{ color: colors.text }}>Remember me</Text>
            </View>

            <Button title='Log in' disabled={disableLogIn()} onPress={logIn} size='md' radius='sm' titleStyle={{ fontWeight: 'bold' }} disabledTitleStyle={{ color: colors.placeholder }} disabledStyle={{ backgroundColor: colors.inputFill }} containerStyle={{ marginHorizontal: '5%', marginTop: '5%' }} />
            <Helper visible={disableLogIn() || helpers} message={helpers ? helpers.message : 'All the inputs should be correctly filled.'} justifyContent='center' />
        </View>
    );
};

export default LogInForm;