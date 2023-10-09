import { useTheme } from '@react-navigation/native';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';

const RegisterForm = () => {
    // Input variables
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    // Style variables
    const { colors } = useTheme();
    const styles = StyleSheet.create({
        form: {
            width: "80%"
        },
        input: {
            backgroundColor: colors.inputFill,
            margin: '2%'
        }
    });

    return (
        <View style={styles.form}>
            <TextInput label='First name' placeholder='Enter your first name' onChangeText={text => setFirstName(text)} inputMode='text' selectionColor={colors.text} textColor={colors.text} placeholderTextColor={colors.placeholder} activeUnderlineColor={colors.primary} style={styles.input} />
            <TextInput label='Last name' placeholder='Enter your last name' onChangeText={text => setLastName(text)} inputMode='text' selectionColor={colors.text} textColor={colors.text} placeholderTextColor={colors.placeholder} activeUnderlineColor={colors.primary} style={styles.input} />
            <Text>First name : {firstName}</Text>
            <Text>Last name : {lastName}</Text>
        </View>
    );
};

export default RegisterForm;
