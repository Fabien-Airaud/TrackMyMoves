import { useTheme } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';

// import Helper from '../Helper';
import { auth } from '../../firebaseConfig';
import Helper from '../Helper';
import Input from '../Input';

const RegisterFirebase = ({ navigation }) => {
    // Input variables
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [securedPassword, setSecuredPassword] = useState(true);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [securedConfirmPassword, setSecuredConfirmPassword] = useState(true);
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


    // Check function to disable the register button
    const disableRegister = () => {
        return (email == '') || (password == '') || (password !== confirmPassword);
    };

    // const auth = getAuth();
    const register = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up
                const user = userCredential.user;
                console.log("Registered: " + user);
            })
            .catch(console.error);
    };

    return (
        <View style={{ width: '80%', marginVertical: "2%" }}>
            <Text style={styles.title}>Register with Firebase</Text>

            <Input label='Email address' placeholder='Enter your email address' onChangeText={text => setEmail(text)} inputMode='email' />
            {/* <Helper visible={helpers?.user?.email != undefined} message={helpers?.user?.email ? helpers?.user?.email[0] : ""} /> */}

            <Input label='Password' placeholder='Enter your password' secureTextEntry={securedPassword} onChangeText={text => setPassword(text)} inputMode='text' right={<TextInput.Icon icon={securedPassword ? 'eye' : 'eye-off'} onPress={() => setSecuredPassword(!securedPassword)} color={colors.placeholder} />} />
            {/* <Helper visible={helpers?.user?.password != undefined} message={helpers?.user?.password ? helpers?.user?.password[0] : ""} /> */}

            <Input label='Confirm password' placeholder='Confirm your password' secureTextEntry={securedConfirmPassword} onChangeText={text => setConfirmPassword(text)} inputMode='text' right={<TextInput.Icon icon={securedConfirmPassword ? 'eye' : 'eye-off'} onPress={() => setSecuredConfirmPassword(!securedConfirmPassword)} color={colors.placeholder} />} />

            <Button title='Register with Firebase' disabled={disableRegister()} onPress={register} size='md' radius='sm' titleStyle={{ fontWeight: 'bold' }} disabledTitleStyle={{ color: colors.placeholder }} disabledStyle={{ backgroundColor: colors.inputFill }} containerStyle={{ marginHorizontal: '5%', marginTop: '5%' }} />
            <Helper visible={disableRegister()} message={(password !== confirmPassword) ? 'password and password confirmation should be the same' : 'all the inputs should be correctly filled.'} justifyContent='center' />
        </View>
    );
};

export default RegisterFirebase;
