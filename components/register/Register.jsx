import { StyleSheet, Button, Text, View } from 'react-native';

const Register = ({ navigation }) => {
    return (
        <View style={styles.page}>
            <Text>Register page</Text>
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
