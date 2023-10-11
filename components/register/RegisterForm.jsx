import { useTheme } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Checkbox, HelperText, TextInput } from 'react-native-paper';
import { DatePickerInput } from 'react-native-paper-dates';

const Input = ({ label, placeholder, secureTextEntry, onChangeText, inputMode, right }) => {
    // Style variables
    const { colors } = useTheme();
    const styles = StyleSheet.create({
        input: {
            backgroundColor: colors.inputFill,
            marginVertical: '2%'
        }
    });

    return (
        <TextInput label={label}
            placeholder={placeholder}
            secureTextEntry={false | secureTextEntry}
            onChangeText={onChangeText}
            inputMode={inputMode}
            right={right}
            textColor={colors.text}
            theme={{ colors: { primary: colors.primary, onSurfaceVariant: colors.placeholder } }}
            style={styles.input}
        />
    );
};

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
        form: {
            width: '80%'
        },
        input: {
            backgroundColor: colors.inputFill,
            marginVertical: '2%'
        }
    });

    // Disable function for the register button
    const disableRegister = () => {
        return (firstName == '') || (lastName == '') || (emailAddress == '') || (password == '') || (birthdate == undefined) || (height == undefined) || (weight == undefined) || (country == '');
    };

    return (
        <View style={styles.form}>
            <Input label='First name' placeholder='Enter your first name' onChangeText={text => setFirstName(text)} inputMode='text' />
            <Input label='Last name' placeholder='Enter your last name' onChangeText={text => setLastName(text)} inputMode='text' />
            <Input label='Email address' placeholder='Enter your email address' onChangeText={text => setEmailAddress(text)} inputMode='email' />
            <Input label='Password' placeholder='Enter your password' secureTextEntry={securedPassword} onChangeText={text => setPassword(text)} inputMode='text' right={<TextInput.Icon icon={securedPassword ? 'eye' : 'eye-off'} onPress={() => setSecuredPassword(!securedPassword)} color={colors.placeholder} />} />
            <DatePickerInput locale='en' label='Birthdate' value={birthdate} onChange={(date) => setBirthdate(date)} validRange={{ endDate: Date.now() }} inputMode='start' textColor={colors.text} theme={{ colors: { primary: colors.primary, onSurfaceVariant: colors.placeholder } }} iconColor={colors.placeholder} style={[styles.input, { width: '56px' }]} />
            <Input label='Current height' placeholder='Enter your current height' onChangeText={number => { (/^\b\d{1,3}\b$/.test(number)) ? setHeight(number) : setHeight(undefined) }} inputMode='numeric' />
            <Input label='Current weigh' placeholder='Enter your current weight' onChangeText={number => { (/^\b\d+[.,]?\d*\b$/.test(number)) ? setWeight(number) : setWeight(undefined) }} inputMode='decimal' />
            <Input label='Country' placeholder='Enter your country' onChangeText={text => setCountry(text)} inputMode='text' />

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Checkbox status={rememberMe ? 'checked' : 'unchecked'} onPress={() => setRememberMe(!rememberMe)} color={colors.primary} />
                <Text style={{ color: colors.text }}>Remember me</Text>
            </View>

            <Button title='Register' disabled={disableRegister()} onPress={() => navigation.goBack()} size='md' radius='sm' titleStyle={{ fontWeight: 'bold' }} disabledTitleStyle={{ color: colors.placeholder }} disabledStyle={{ backgroundColor: colors.inputFill }} containerStyle={{ marginHorizontal: '5%', marginTop: '5%' }} />
            <HelperText type="error" visible={disableRegister()} padding='none' style={{marginHorizontal: 'auto'}}> All the inputs should be correctly filled. </HelperText>
        </View>
    );
};

export default RegisterForm;
