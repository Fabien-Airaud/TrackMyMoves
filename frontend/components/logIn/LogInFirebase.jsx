import { useTheme } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import { GoogleAuthProvider, getRedirectResult, signInWithEmailAndPassword, signInWithRedirect } from "firebase/auth";
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';

import { auth, provider } from '../../firebaseConfig';
import Helper from '../Helper';
import Input from '../Input';

const LogInFirebase = () => {
    // Input variables
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [securedPassword, setSecuredPassword] = useState(true);
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


    // Disable function for the log in button
    const disableLogIn = () => {
        return (email == '') || (password == '');
    };

    const logIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                setHelpers(undefined);
                // const user = userCredential.user;
            })
            .catch((error) => {
                setHelpers(error.code);
                console.log(JSON.stringify(error.message));
            });
    };

    const googleLogIn = () => {
        // // Method 1
        // signInWithPopup(auth, provider)
        //     .then((result) => {
        //         // This gives you a Google Access Token. You can use it to access the Google API.
        //         const credential = GoogleAuthProvider.credentialFromResult(result);
        //         const token = credential.accessToken;
        //         // The signed-in user info.
        //         const user = result.user;
        //         // IdP data available using getAdditionalUserInfo(result)
        //         // ...
        //     }).catch((error) => {
        //         // Handle Errors here.
        //         const errorCode = error.code;
        //         const errorMessage = error.message;
        //         // The email of the user's account used.
        //         const email = error.customData.email;
        //         // The AuthCredential type that was used.
        //         const credential = GoogleAuthProvider.credentialFromError(error);
        //         // ...
        //     });

        // // Method 2
        // signInWithRedirect(auth, provider);
        // getRedirectResult(auth)
        //     .then((result) => {
        //         // This gives you a Google Access Token. You can use it to access Google APIs.
        //         const credential = GoogleAuthProvider.credentialFromResult(result);
        //         const token = credential.accessToken;

        //         // The signed-in user info.
        //         const user = result.user;
        //         // IdP data available using getAdditionalUserInfo(result)
        //         // ...
        //     }).catch((error) => {
        //         // Handle Errors here.
        //         const errorCode = error.code;
        //         const errorMessage = error.message;
        //         // The email of the user's account used.
        //         const email = error.customData.email;
        //         // The AuthCredential type that was used.
        //         const credential = GoogleAuthProvider.credentialFromError(error);
        //         // ...
        //     });
    };

    return (
        <View style={{ width: '80%', marginVertical: "5%" }}>
            <Text style={styles.title}>Log in with Firebase</Text>

            {/* <Button title='Google log in' onPress={googleLogIn} size='md' radius='sm' titleStyle={{ fontWeight: 'bold' }} disabledTitleStyle={{ color: colors.placeholder }} disabledStyle={{ backgroundColor: colors.inputFill }} containerStyle={{ marginHorizontal: '5%', marginTop: '5%' }} /> */}

            <Input label='Email address' placeholder='Enter your email address' onChangeText={text => setEmail(text)} inputMode='email' />
            <Input label='Password' placeholder='Enter your password' secureTextEntry={securedPassword} onChangeText={text => setPassword(text)} inputMode='text' right={<TextInput.Icon icon={securedPassword ? 'eye' : 'eye-off'} onPress={() => setSecuredPassword(!securedPassword)} color={colors.placeholder} />} />

            <Button title='Log in with Firebase' disabled={disableLogIn()} onPress={logIn} size='md' radius='sm' titleStyle={{ fontWeight: 'bold' }} disabledTitleStyle={{ color: colors.placeholder }} disabledStyle={{ backgroundColor: colors.inputFill }} containerStyle={{ marginHorizontal: '5%', marginTop: '5%' }} />
            <Helper visible={disableLogIn() || helpers} message={helpers ? helpers : 'All the inputs should be correctly filled.'} justifyContent='center' />
        </View>
    );
};

export default LogInFirebase;