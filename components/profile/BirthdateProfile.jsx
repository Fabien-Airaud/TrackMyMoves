import { useTheme } from '@react-navigation/native';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { DatePickerInput } from 'react-native-paper-dates';
import { useDispatch } from 'react-redux';

import { updateBirthdate } from '../../redux/accountSlice';
import { updateLogBirthdate } from '../../redux/logInSlice';

const BirthdateProfile = ({ id, data }) => {
    // state variables
    const [edit, setEdit] = useState(false);
    const [value, setValue] = useState(new Date(data));

    // Style variables
    const { colors, fontSizes } = useTheme();
    const styles = StyleSheet.create({
        view: {
            flexDirection: 'row',
            justifyContent: 'start',
            alignItems: 'center',
            width: '100%',
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

    const dispatchBirthdate = () => {
        // Convert to string
        const birthdate = value.toISOString();

        if (data !== birthdate) {
            dispatch(
                updateBirthdate({
                    id: id,
                    birthdate: birthdate
                })
            );
            dispatch(
                updateLogBirthdate({
                    id: id,
                    birthdate: birthdate
                })
            );
            console.log(data + ' -> ' + birthdate);
        }
        setEdit(false);
    };

    return (
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
                        <IconButton icon='check-bold' onPress={() => dispatchBirthdate()} iconColor={colors.text} containerColor={colors.success} size={fontSizes.sm} />
                        <IconButton icon='close-thick' onPress={() => { setEdit(false); setValue(new Date(data)); }} iconColor={colors.text} containerColor={colors.error} size={fontSizes.sm} />
                    </>
                    : <IconButton icon='pencil' onPress={() => setEdit(true)} iconColor={colors.text} containerColor={colors.primary} size={fontSizes.sm} />
                }
            </View>
        </View>
    );
};

export default BirthdateProfile;
