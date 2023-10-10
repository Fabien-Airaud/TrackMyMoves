import { useTheme } from '@react-navigation/native';
import { StyleSheet, Text, ScrollView } from 'react-native';
import { Button } from '@rneui/themed';

import RegisterForm from './RegisterForm';

const Register = ({ navigation }) => {
    // Style variables
    const { colors, fontSizes } = useTheme();
    const styles = StyleSheet.create({
        page: {
            minHeight: '100%',
            width: '100%',
            padding: '5%',
            backgroundColor: colors.background
        },
        text: {
            color: colors.text,
            fontSize: fontSizes.sm,
            margin: '5%'
        }
    });

    return (
        <ScrollView contentContainerStyle={{alignItems: 'center'}} style={styles.page} >
            <RegisterForm />
            <Text style={styles.text}>
                Already registered ?
                <Button title='Log in' type='clear' onPress={() => navigation.navigate('LogIn')} titleStyle={{ fontSize: fontSizes.sm }} />
            </Text>
        </ScrollView>
    );
};

export default Register;
