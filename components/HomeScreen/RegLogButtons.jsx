import { Button } from '@rneui/themed';
import { StyleSheet, View } from 'react-native';

const RegLogButton = ({ title }) => {
    return (
        <Button
            title={title}
            size='md'
            radius='sm'
            titleStyle={{ fontWeight: 'bold' }}
            containerStyle={{
                marginHorizontal: '5%'
            }}
        />
    );
};

const RegLogButtons = () => {
    return (
        <View style={styles.buttons}>
            <RegLogButton title='Register' />
            <RegLogButton title='Log in' />
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
