import { useTheme } from '@react-navigation/native';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { DatePickerInput } from 'react-native-paper-dates';


const RegisterForm = () => {
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

    // Style variables
    const { colors } = useTheme();
    const styles = StyleSheet.create({
        form: {
            width: '80%'
        },
        input: {
            backgroundColor: colors.inputFill,
            marginVertical: '2%'
        }
    });

    return (
        <View style={styles.form}>
            <TextInput label='First name' placeholder='Enter your first name' onChangeText={text => setFirstName(text)} inputMode='text' textColor={colors.text} placeholderTextColor={colors.placeholder} activeUnderlineColor={colors.primary} style={styles.input} />
            <TextInput label='Last name' placeholder='Enter your last name' onChangeText={text => setLastName(text)} inputMode='text' textColor={colors.text} placeholderTextColor={colors.placeholder} activeUnderlineColor={colors.primary} style={styles.input} />
            <TextInput label='Email address' placeholder='Enter your email address' onChangeText={text => setEmailAddress(text)} inputMode='email' textColor={colors.text} placeholderTextColor={colors.placeholder} activeUnderlineColor={colors.primary} style={styles.input} />
            <TextInput label='Password' placeholder='Enter your password' secureTextEntry={securedPassword} onChangeText={text => setPassword(text)} inputMode='text' right={<TextInput.Icon icon={securedPassword ? 'eye' : 'eye-off'} onPress={() => setSecuredPassword(!securedPassword)} />} textColor={colors.text} placeholderTextColor={colors.placeholder} activeUnderlineColor={colors.primary} style={styles.input} />
            <DatePickerInput locale='en' label='Birthdate' value={birthdate} onChange={(date) => setBirthdate(date)} validRange={{ endDate: Date.now() }} inputMode='start' textColor={colors.text} placeholderTextColor={colors.placeholder} activeUnderlineColor={colors.primary} style={[styles.input, { width: '56px' }]} />
            <TextInput label='Current height' placeholder='Enter your current height' onChangeText={number => { (/^\b\d{1,3}\b$/.test(number)) ? setHeight(number) : setHeight(undefined) }} inputMode='numeric' textColor={colors.text} placeholderTextColor={colors.placeholder} activeUnderlineColor={colors.primary} style={styles.input} />
            <TextInput label='Current weight' placeholder='Enter your current weight' onChangeText={number => { (/^\b\d+[.,]?\d*\b$/.test(number)) ? setWeight(number) : setWeight(undefined) }} inputMode='decimal' textColor={colors.text} placeholderTextColor={colors.placeholder} activeUnderlineColor={colors.primary} style={styles.input} />
            <TextInput label='Country' placeholder='Enter your country' onChangeText={text => setCountry(text)} inputMode='text' textColor={colors.text} placeholderTextColor={colors.placeholder} activeUnderlineColor={colors.primary} style={styles.input} />

            <Text>First name : {firstName}</Text>
            <Text>Last name : {lastName}</Text>
            <Text>Email address : {emailAddress}</Text>
            <Text>Password : {password}</Text>
            <Text>Birthdate : {birthdate === undefined ? '' : birthdate.toLocaleDateString('en')}</Text>
            <Text>Current height : {height}</Text>
            <Text>Current weight : {weight}</Text>
            <Text>Country : {country}</Text>
        </View>
    );
};

export default RegisterForm;
