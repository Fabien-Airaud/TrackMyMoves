import { useTheme } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { Checkbox, HelperText, TextInput } from 'react-native-paper';

import Input from '../register/Input';

const LogInForm = ({ navigation }) => {
    // Input variables
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [securedPassword, setSecuredPassword] = useState(true);
    const [rememberMe, setRememberMe] = useState(false);

    // Style variables
    const { colors } = useTheme();

    // Disable function for the log in button
    const disableLogIn = () => {
        return (emailAddress == '') || (password == '');
    };

    return (
        <View style={{ width: '80%' }}>
            <Input label='Email address' placeholder='Enter your email address' onChangeText={text => setEmailAddress(text)} inputMode='email' />
            <Input label='Password' placeholder='Enter your password' secureTextEntry={securedPassword} onChangeText={text => setPassword(text)} inputMode='text' right={<TextInput.Icon icon={securedPassword ? 'eye' : 'eye-off'} onPress={() => setSecuredPassword(!securedPassword)} color={colors.placeholder} />} />

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Checkbox status={rememberMe ? 'checked' : 'unchecked'} onPress={() => setRememberMe(!rememberMe)} color={colors.primary} />
                <Text style={{ color: colors.text }}>Remember me</Text>
            </View>

            <Button title='Log in' disabled={disableLogIn()} onPress={() => navigation.popToTop()} size='md' radius='sm' titleStyle={{ fontWeight: 'bold' }} disabledTitleStyle={{ color: colors.placeholder }} disabledStyle={{ backgroundColor: colors.inputFill }} containerStyle={{ marginHorizontal: '5%', marginTop: '5%' }} />
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}><HelperText type="error" visible={disableLogIn()} padding='none'> All the inputs should be correctly filled. </HelperText></View>
        </View>
    );
};

export default LogInForm;