import { useTheme } from '@react-navigation/native';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import { Button } from '@rneui/themed';

import LogInForm from './LogInForm';
import LogInFirebase from './LogInFirebase';

const LogIn = ({ navigation }) => {
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
        <ScrollView contentContainerStyle={{alignItems: 'center'}} style={styles.page} >
            <LogInForm />
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.text}> Haven't registered yet ? </Text>
                <Button title='Register' type='clear' onPress={() => navigation.navigate('Register')} titleStyle={{ fontSize: fontSizes.sm, color: colors.primary }} />
            </View>
            <LogInFirebase />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    page: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default LogIn;
