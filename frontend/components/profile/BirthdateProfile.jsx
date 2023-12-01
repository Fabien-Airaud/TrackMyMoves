import { useTheme } from '@react-navigation/native';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { DatePickerInput } from 'react-native-paper-dates';
import { useDispatch, useSelector } from 'react-redux';

import { changeAccount } from '../../redux/apiAccountSlice';
import { dateToStringAPIDate, patchAccountAPI, stringAPIDateToDate } from '../APIFunctions';
import Helper from '../Helper';

const BirthdateProfile = () => {
    // Logged account stored in redux
    const apiAccount = useSelector((state) => state.apiAccount);

    // state variables
    const [edit, setEdit] = useState(false);
    const [value, setValue] = useState(stringAPIDateToDate(apiAccount.account.birthdate));
    const [helpers, setHelpers] = useState(undefined);

    // Style variables
    const { colors, fontSizes } = useTheme();
    const styles = StyleSheet.create({
        view: {
            flexDirection: 'row',
            justifyContent: 'start',
            alignItems: 'center',
            width: '100%',
        },
        colView: {
            alignItems: 'start',
            width: '100%'
        },
        text: {
            color: colors.text,
            fontSize: fontSizes.sm
        },
        input: {
            width: '75%',
            backgroundColor: colors.inputFill,
            marginVertical: '2%',
            paddingHorizontal: 10
        }
    });


    // Dispatch account
    const dispatch = useDispatch();

    const updateBirthdate = () => {
        // Convert to string
        const birthdate = dateToStringAPIDate(value);

        if (apiAccount.account.birthdate !== birthdate) {
            patchAccountAPI(apiAccount.token, apiAccount.account.id, { birthdate: birthdate })
                .then(data => {
                    if (data.ok) {
                        setHelpers(undefined);
                        dispatch(changeAccount(data.ok));
                    }
                    else {
                        setHelpers(data.helpers);
                    }
                })
                .catch(console.error);
        }
        setEdit(false);
    };

    return (
        <View style={styles.colView}>
            <View style={styles.view}>
                <DatePickerInput
                    locale='en'
                    label={edit ? 'Birthdate' : ''}
                    withDateFormatInLabel={edit}
                    value={value}
                    disabled={!edit}
                    onChange={(date) => setValue(date)}
                    validRange={{ endDate: Date.now() }}
                    inputMode='start'
                    textColor={colors.text}
                    theme={{ colors: { primary: colors.primary, onSurfaceVariant: colors.placeholder } }}
                    iconColor={colors.placeholder}
                    style={styles.input}
                />
                <View style={[styles.view, { paddingHorizontal: 5, minWidth: 3 * fontSizes.sm, maxWidth: '25%' }]}>
                    {edit ?
                        <>
                            <IconButton icon='check-bold' onPress={updateBirthdate} iconColor={colors.text} containerColor={colors.success} size={fontSizes.sm} />
                            <IconButton icon='close-thick' onPress={() => { setEdit(false); setValue(stringAPIDateToDate(apiAccount.account.birthdate)); }} iconColor={colors.text} containerColor={colors.error} size={fontSizes.sm} />
                        </>
                        : <IconButton icon='pencil' onPress={() => setEdit(true)} iconColor={colors.text} containerColor={colors.primary} size={fontSizes.sm} />
                    }
                </View>
            </View>
            <Helper visible={helpers && helpers.birthdate} message={helpers && helpers.birthdate ? helpers.birthdate : ''} />
        </View>
    );
};

export default BirthdateProfile;
