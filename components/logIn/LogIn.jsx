import { StyleSheet, Button, Text, View } from 'react-native';

const LogIn = ({ navigation }) => {
    return (
        <View style={styles.page}>
            <Text>Log in page</Text>
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

export default LogIn;
