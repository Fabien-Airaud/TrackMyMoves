import { useTheme } from '@react-navigation/native';
import { ScrollView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import BirthdateProfile from './BirthdateProfile';
import CountryProfile from './CountryProfile';
import EmailProfile from './EmailProfile';
import FirstNameProfile from './FirstNameProfile';
import HeightProfile from './HeightProfile';
import LastNameProfile from './LastNameProfile';
import PasswordProfile from './PasswordProfile';
import WeightProfile from './WeightProfile';

const Profile = () => {
    // Logged account stored in redux
    const logAcc = useSelector((state) => state.logIn.account);

    // Style variables
    const { colors } = useTheme();
    const styles = StyleSheet.create({
        page: {
            minHeight: '100%',
            width: '100%',
            padding: '5%',
            backgroundColor: colors.background
        }
    });

    return (
        <ScrollView contentContainerStyle={{ alignItems: 'center' }} style={styles.page}>
            <FirstNameProfile id={logAcc.id} data={logAcc.firstName} />
            <LastNameProfile id={logAcc.id} data={logAcc.lastName} />
            <EmailProfile id={logAcc.id} data={logAcc.emailAddress} />
            <PasswordProfile id={logAcc.id} data={logAcc.password} />
            <BirthdateProfile id={logAcc.id} data={logAcc.birthdate} />
            <HeightProfile id={logAcc.id} data={logAcc.height} />
            <WeightProfile id={logAcc.id} data={logAcc.weight} />
            <CountryProfile id={logAcc.id} data={logAcc.country} />
        </ScrollView>
    );
};

export default Profile;