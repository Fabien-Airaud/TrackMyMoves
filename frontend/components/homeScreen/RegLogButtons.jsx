import { useTheme } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import { StyleSheet, View } from 'react-native';

const RegLogButton = ({ title, navigation, route }) => {
    // Style variables
    const { colors } = useTheme();

    return (
        <Button
            title={title}
            size='md'
            radius='sm'
            titleStyle={{ fontWeight: 'bold' }}
            color={colors.primary}
            containerStyle={{
                marginHorizontal: '5%',
                width: '30%'
            }}
            onPress={() => navigation.push(route)}
        />
    );
};

const RegLogButtons = ({ navigation }) => {
    return (
        <View style={styles.buttons}>
            <RegLogButton title='Register' navigation={navigation} route={'Register'} />
            <RegLogButton title='Log in' navigation={navigation} route={'LogIn'} />
        </View>
    );
};

const styles = StyleSheet.create({
    buttons: {
        height: '10%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default RegLogButtons;
