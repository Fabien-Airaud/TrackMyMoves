import { useTheme } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';

import Helper from '../Helper';
import Input from '../Input';

const LogInFirebase = () => {
    // Input variables
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [securedPassword, setSecuredPassword] = useState(true);
    // const [helpers, setHelpers] = useState(undefined);

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


    // Disable function for the log in button
    const disableLogIn = () => {
        return (email == '') || (password == '');
    };

    const logIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log("Registered: " + JSON.stringify(user));
            })
            .catch(console.error);
    };

    return (
        <View style={{ width: '80%', marginVertical: "5%" }}>
            <Text style={styles.title}>Log in with Firebase</Text>

            <Input label='Email address' placeholder='Enter your email address' onChangeText={text => setEmail(text)} inputMode='email' />
            <Input label='Password' placeholder='Enter your password' secureTextEntry={securedPassword} onChangeText={text => setPassword(text)} inputMode='text' right={<TextInput.Icon icon={securedPassword ? 'eye' : 'eye-off'} onPress={() => setSecuredPassword(!securedPassword)} color={colors.placeholder} />} />

            <Button title='Log in with Firebase' disabled={disableLogIn()} onPress={logIn} size='md' radius='sm' titleStyle={{ fontWeight: 'bold' }} disabledTitleStyle={{ color: colors.placeholder }} disabledStyle={{ backgroundColor: colors.inputFill }} containerStyle={{ marginHorizontal: '5%', marginTop: '5%' }} />
            <Helper visible={disableLogIn()} message={'All the inputs should be correctly filled.'} justifyContent='center' />
        </View>
    );
};

export default LogInFirebase;