import { useTheme } from '@react-navigation/native';
import { StyleSheet, Button, Text, View } from 'react-native';

const Register = ({ navigation }) => {
    const { colors } = useTheme();

    return (
        <View style={styles.page}>
            <Text style={{ color: colors.text }}>Register page</Text>
            <Button title="Go back" onPress={() => navigation.goBack()} />
        </View>
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

export default Register;
