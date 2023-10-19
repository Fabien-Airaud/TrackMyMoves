import { useTheme } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Checkbox, TextInput } from 'react-native-paper';
import { DatePickerInput } from 'react-native-paper-dates';
import { useDispatch, useSelector } from 'react-redux';

import { createAccount } from '../../redux/accountSlice';
import Helper from '../Helper';
import Input from '../Input';
import { usedEmail } from './CheckFonctions';

const RegisterForm = ({ navigation }) => {
    // Input variables
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [securedPassword, setSecuredPassword] = useState(true);
    const [birthdate, setBirthdate] = useState(undefined);
    const [height, setHeight] = useState(undefined);
    const [weight, setWeight] = useState(undefined);
    const [country, setCountry] = useState('');
    const [rememberMe, setRememberMe] = useState(false);


    // Style variables
    const { colors } = useTheme();
    const styles = StyleSheet.create({
        datePickerInput: {
            backgroundColor: colors.inputFill,
            width: '56px',
            marginVertical: '2%'
        }
    });

    // Accounts stored in redux
    const accounts = useSelector((state) => state.accounts);

    // Check function to disable the register button
    const disableRegister = () => {
        return usedEmail(accounts, emailAddress) || (firstName == '') || (lastName == '') || (emailAddress == '') || (password == '') || (birthdate == undefined) || (height == undefined) || (weight == undefined) || (country == '');
    };

    // Dispatch account
    const dispatch = useDispatch();

    const dispatchAccount = () => {
        dispatch(
            createAccount({
                firstName: firstName,
                lastName: lastName,
                emailAddress: emailAddress,
                password: password,
                birthdate: birthdate,
                height: height,
                weight: weight,
                country: country
            })
        );
        navigation.navigate('LogIn');
    };

    return (
        <View style={{ width: '80%' }}>
            <Input label='First name' placeholder='Enter your first name' onChangeText={text => setFirstName(text)} inputMode='text' />
            <Input label='Last name' placeholder='Enter your last name' onChangeText={text => setLastName(text)} inputMode='text' />
            <Input label='Email address' placeholder='Enter your email address' onChangeText={text => setEmailAddress(text)} inputMode='email' />
            <Input label='Password' placeholder='Enter your password' secureTextEntry={securedPassword} onChangeText={text => setPassword(text)} inputMode='text' right={<TextInput.Icon icon={securedPassword ? 'eye' : 'eye-off'} onPress={() => setSecuredPassword(!securedPassword)} color={colors.placeholder} />} />
            <DatePickerInput locale='en' label='Birthdate' value={birthdate} onChange={(date) => setBirthdate(date)} validRange={{ endDate: Date.now() }} inputMode='start' textColor={colors.text} theme={{ colors: { primary: colors.primary, onSurfaceVariant: colors.placeholder } }} iconColor={colors.placeholder} style={styles.datePickerInput} />
            <Input label='Current height (cm)' placeholder='Enter your current height' onChangeText={number => { (/^\b\d{1,3}\b$/.test(number)) ? setHeight(number) : setHeight(undefined) }} inputMode='numeric' />
            <Input label='Current weigh (kg)' placeholder='Enter your current weight' onChangeText={number => { (/^\b\d+[.,]?\d*\b$/.test(number) && number < 1000) ? setWeight(number) : setWeight(undefined) }} inputMode='decimal' />
            <Input label='Country' placeholder='Enter your country' onChangeText={text => setCountry(text)} inputMode='text' />

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Checkbox status={rememberMe ? 'checked' : 'unchecked'} onPress={() => setRememberMe(!rememberMe)} color={colors.primary} />
                <Text style={{ color: colors.text }}>Remember me</Text>
            </View>

            <Button title='Register' disabled={disableRegister()} onPress={() => dispatchAccount()} size='md' radius='sm' titleStyle={{ fontWeight: 'bold' }} disabledTitleStyle={{ color: colors.placeholder }} disabledStyle={{ backgroundColor: colors.inputFill }} containerStyle={{ marginHorizontal: '5%', marginTop: '5%' }} />
            <Helper visible={disableRegister()} message={usedEmail(accounts, emailAddress) ? 'Email already in use, please use another or log in' : 'All the inputs should be correctly filled.'} justifyContent='center' />
        </View>
    );
};

export default RegisterForm;
