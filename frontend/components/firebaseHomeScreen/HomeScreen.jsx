import { useTheme } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import { signOut } from "firebase/auth";
import { StyleSheet, Text, View } from 'react-native';

import { auth } from '../../firebaseConfig';

const FirebaseHomeScreen = ({ navigation }) => {
    const { colors, fontSizes } = useTheme();
    const styles = StyleSheet.create({
        page: {
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        },
        brand: {
            color: colors.text,
            fontSize: fontSizes.md,
            fontWeight: 'bold',
            paddingHorizontal: '5%',
            paddingVertical: '1%',
            textAlign: 'center'
        },
        logo: {
            width: '100%',
            height: '50%',
            resizeMode: 'center'
        }
    });

    const logOut = () => {
        signOut(auth)
            .then(() => console.log("Signed out from Firebase"))
            .catch(console.error);
    }

    return (
        <View style={styles.page}>
            <Text style={styles.brand}>Welcome</Text>
            <Text style={styles.brand}>{auth.currentUser.email}</Text>
            <Text style={styles.brand}>in Firebase home page </Text>
            <Button title='Log out' onPress={logOut} size='lg' radius='sm' titleStyle={{ fontWeight: 'bold' }} containerStyle={{ marginHorizontal: '5%', marginTop: '5%', width: '30%' }} />
        </View>
    );
};

export default FirebaseHomeScreen;
