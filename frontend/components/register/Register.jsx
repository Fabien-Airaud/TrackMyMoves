import { useTheme } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import RegisterFirebase from './RegisterFirebase';
import RegisterForm from './RegisterForm';

const Register = ({ navigation }) => {
    // Style variables
    const { colors, fontSizes } = useTheme();
    const styles = StyleSheet.create({
        page: {
            minHeight: '100%',
            width: '100%',
            backgroundColor: colors.background
        },
        text: {
            color: colors.text,
            fontSize: fontSizes.sm
        }
    });

    return (
        <ScrollView contentContainerStyle={{ alignItems: 'center' }} style={styles.page} >
            <RegisterForm navigation={navigation} />
            <View style={{ margin: '5%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.text}> Already registered ? </Text>
                <Button title='Log in' type='clear' onPress={() => navigation.navigate('LogIn')} titleStyle={{ fontSize: fontSizes.sm, color: colors.primary }} />
            </View>
            <RegisterFirebase />
        </ScrollView>
    );
};

export default Register;
