import { useTheme } from '@react-navigation/native';
import { Button, StyleSheet, Text, View } from 'react-native';

import RegisterForm from './RegisterForm';

const Register = ({ navigation }) => {
    const { colors } = useTheme();

    return (
        <View style={styles.page} >
            <RegisterForm />
            <Text style={{ color: colors.text, margin: '5%' }}>Register page</Text>
            <Button title="Go back" onPress={() => navigation.goBack()} style={{ margin: '5%' }} />
        </View>
    );
};

const styles = StyleSheet.create({
    page: {
        height: '100%',
        width: '100%',
        padding: '5%',
        alignItems: 'center'
    }
});

export default Register;
