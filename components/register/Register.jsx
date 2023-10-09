import { useTheme } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@rneui/themed';

import RegisterForm from './RegisterForm';

const Register = ({ navigation }) => {
    // Style variables
    const { colors, fontSizes } = useTheme();
    const styles = StyleSheet.create({
        page: {
            height: '100%',
            width: '100%',
            padding: '5%',
            alignItems: 'center'
        },
        text: {
            color: colors.text,
            fontSize: fontSizes.sm,
            margin: '5%'
        }
    });

    return (
        <View style={styles.page} >
            <RegisterForm />
            <Text style={styles.text}>
                Already registered ?
                <Button title='Log in' type='clear' onPress={() => navigation.navigate('LogIn')} titleStyle={{ fontSize: fontSizes.sm }} />
            </Text>
        </View>
    );
};

export default Register;
