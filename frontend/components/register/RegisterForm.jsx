import { useTheme } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { DatePickerInput } from 'react-native-paper-dates';

import { registerAPI } from '../APIFunctions';
import Helper from '../Helper';
import Input from '../Input';

const RegisterForm = ({ navigation }) => {
    // Input variables
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [securedPassword, setSecuredPassword] = useState(true);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [securedConfirmPassword, setSecuredConfirmPassword] = useState(true);
    const [birthdate, setBirthdate] = useState(undefined);
    const [height, setHeight] = useState(undefined);
    const [weight, setWeight] = useState(undefined);
    const [country, setCountry] = useState('');
    const [helpers, setHelpers] = useState(undefined);

    // Style variables
    const { colors } = useTheme();
    const styles = StyleSheet.create({
        datePickerInput: {
            backgroundColor: colors.inputFill,
            width: '56px',
            marginVertical: '2%'
        }
    });


    // Check function to disable the register button
    const disableRegister = () => {
        return (firstName == '') || (lastName == '') || (email == '') || (password == '') || (password !== confirmPassword) || (birthdate == undefined) || (height == undefined) || (weight == undefined) || (country == '');
    };

    const register = () => {
        registerAPI(email, password, firstName, lastName, birthdate, height, weight, country)
            .then(data => {
                if (data) setHelpers(data);
                else {
                    navigation.navigate('LogIn');
                    Alert.alert(
                        'Register',
                        'Account created, please log in'
                    );
                }
            })
            .catch(console.error);
    };

    return (
        <View style={{ width: '80%' }}>
            <Input label='First name' placeholder='Enter your first name' onChangeText={text => setFirstName(text)} inputMode='text' />
            <Helper visible={helpers?.first_name} message={helpers?.first_name[0]} />

            <Input label='Last name' placeholder='Enter your last name' onChangeText={text => setLastName(text)} inputMode='text' />
            <Helper visible={helpers?.last_name} message={helpers?.last_name[0]} />

            <Input label='Email address' placeholder='Enter your email address' onChangeText={text => { setEmail(text); setHelpers(undefined) }} inputMode='email' />
            <Helper visible={helpers?.user?.email} message={helpers?.user?.email[0]} />

            <Input label='Password' placeholder='Enter your password' secureTextEntry={securedPassword} onChangeText={text => setPassword(text)} inputMode='text' right={<TextInput.Icon icon={securedPassword ? 'eye' : 'eye-off'} onPress={() => setSecuredPassword(!securedPassword)} color={colors.placeholder} />} />
            <Helper visible={helpers?.user?.password} message={helpers?.user?.password[0]} />

            <Input label='Confirm password' placeholder='Confirm your password' secureTextEntry={securedConfirmPassword} onChangeText={text => setConfirmPassword(text)} inputMode='text' right={<TextInput.Icon icon={securedConfirmPassword ? 'eye' : 'eye-off'} onPress={() => setSecuredConfirmPassword(!securedConfirmPassword)} color={colors.placeholder} />} />

            <DatePickerInput locale='en' label='Birthdate' value={birthdate} onChange={(date) => setBirthdate(date)} validRange={{ endDate: Date.now() }} hasError={birthdate > new Date()} inputMode='start' textColor={colors.text} theme={{ colors: { primary: colors.primary, onSurfaceVariant: colors.placeholder } }} iconColor={colors.placeholder} style={styles.datePickerInput} />
            <Helper visible={helpers?.birthdate} message={helpers?.birthdate[0]} />

            <Input label='Current height (cm)' placeholder='Enter your current height' onChangeText={number => { (/^\b\d{1,3}\b$/.test(number)) ? setHeight(number) : setHeight(undefined) }} inputMode='numeric' />
            <Helper visible={helpers?.height} message={helpers?.height[0]} />

            <Input label='Current weigh (kg)' placeholder='Enter your current weight' onChangeText={number => { (/^\b\d+[.,]?\d*\b$/.test(number) && number < 1000) ? setWeight(number) : setWeight(undefined) }} inputMode='decimal' />
            <Helper visible={helpers?.weight} message={helpers?.weight[0]} />

            <Input label='Country' placeholder='Enter your country' onChangeText={text => setCountry(text)} inputMode='text' />
            <Helper visible={helpers?.country} message={helpers?.country[0]} />

            <Button title='Register' disabled={disableRegister()} onPress={register} size='md' radius='sm' titleStyle={{ fontWeight: 'bold' }} disabledTitleStyle={{ color: colors.placeholder }} disabledStyle={{ backgroundColor: colors.inputFill }} containerStyle={{ marginHorizontal: '5%', marginTop: '5%' }} />
            <Helper visible={disableRegister() || helpers} message={(password !== confirmPassword) ? 'password and password confirmation should be the same' : 'all the inputs should be correctly filled.'} justifyContent='center' />
        </View>
    );
};

export default RegisterForm;
