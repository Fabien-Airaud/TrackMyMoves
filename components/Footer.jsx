import { StyleSheet, View, Text } from 'react-native';

const Footer = () => {
    return (
        <View style={styles.footer}>
            <Text style={styles.text}>Move</Text>
            <Text style={styles.text}>Profile</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        height: '10%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '3%',
        backgroundColor: '#090909'
    },
    text: {
        fontSize: 20,
        color: '#e4e4e4'
    }
});

export default Footer;
