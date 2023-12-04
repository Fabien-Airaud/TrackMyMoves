import { useTheme } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';

import { auth } from '../../firebaseConfig';
import Helper from '../Helper';
import Input from '../Input';

const RegisterFirebase = () => {
    // Input variables
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [securedPassword, setSecuredPassword] = useState(true);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [securedConfirmPassword, setSecuredConfirmPassword] = useState(true);
    const [helpers, setHelpers] = useState(undefined);

    // Style variables
    const { colors, fontSizes } = useTheme();
    const styles = StyleSheet.create({
        title: {
            color: colors.text,
            fontSize: fontSizes.lg,
            fontWeight: "bold",
            marginBottom: '3%'
        }
    });


    // Check function to disable the register button
    const disableRegister = () => {
        return (email == '') || (password == '') || (password !== confirmPassword);
    };

    // const auth = getAuth();
    const register = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up
                setHelpers(undefined);
                const user = userCredential.user;
                console.log("Registered: " + JSON.stringify(user));
            })
            .catch((error) => {
                setHelpers(error.code);
                console.log(JSON.stringify(error.message));
            });
    };

    return (
        <View style={{ width: '80%', marginVertical: "5%" }}>
            <Text style={styles.title}>Register with Firebase</Text>

            <Input label='Email address' placeholder='Enter your email address' onChangeText={text => setEmail(text)} inputMode='email' />

            <Input label='Password' placeholder='Enter your password' secureTextEntry={securedPassword} onChangeText={text => setPassword(text)} inputMode='text' right={<TextInput.Icon icon={securedPassword ? 'eye' : 'eye-off'} onPress={() => setSecuredPassword(!securedPassword)} color={colors.placeholder} />} />

            <Input label='Confirm password' placeholder='Confirm your password' secureTextEntry={securedConfirmPassword} onChangeText={text => setConfirmPassword(text)} inputMode='text' right={<TextInput.Icon icon={securedConfirmPassword ? 'eye' : 'eye-off'} onPress={() => setSecuredConfirmPassword(!securedConfirmPassword)} color={colors.placeholder} />} />

            <Button title='Register with Firebase' disabled={disableRegister()} onPress={register} size='md' radius='sm' titleStyle={{ fontWeight: 'bold' }} disabledTitleStyle={{ color: colors.placeholder }} disabledStyle={{ backgroundColor: colors.inputFill }} containerStyle={{ marginHorizontal: '5%', marginTop: '5%' }} />
            <Helper visible={disableRegister() || helpers} message={(password !== confirmPassword) ? 'password and password confirmation should be the same' : helpers ? helpers : 'all the inputs should be correctly filled.'} justifyContent='center' />
        </View>
    );
};

export default RegisterFirebase;
