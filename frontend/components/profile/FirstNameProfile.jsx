import { useTheme } from '@react-navigation/native';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import { changeAccount } from '../../redux/apiAccountSlice';
import { patchAccountAPI } from '../APIFunctions';

const FirstNameProfile = () => {
    // Logged account stored in redux
    const apiAccount = useSelector((state) => state.apiAccount);

    // state variables
    const [edit, setEdit] = useState(false);
    const [value, setValue] = useState(apiAccount.account.first_name);

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

    const updateFirstName = () => {
        if (apiAccount.account.first_name !== value) {
            patchAccountAPI(apiAccount.token, apiAccount.account.id, { first_name: value })
                .then(data => {
                    if (data.ok) {
                        // setHelpers(undefined);
                        dispatch(changeAccount(data.ok));
                    }
                    else {
                        console.log(data.helpers);
                        // setHelpers(data.helpers);
                    }
                })
                .catch(console.error);
        }
        setEdit(false);
    };

    return (
        <View style={styles.view}>
            <TextInput
                label={edit ? 'First name' : ''}
                value={value}
                disabled={!edit}
                onChangeText={text => setValue(text)}
                inputMode={'text'}
                textColor={colors.text}
                theme={{ colors: { primary: colors.primary, onSurfaceVariant: colors.placeholder } }}
                style={styles.input}
            />
            <View style={[styles.view, { paddingHorizontal: 5, width: 3 * fontSizes.sm }]}>
                {edit ?
                    <>
                        <IconButton icon='check-bold' onPress={updateFirstName} iconColor={colors.text} containerColor={colors.success} size={fontSizes.sm} />
                        <IconButton icon='close-thick' onPress={() => { setEdit(false); setValue(apiAccount.account.first_name); }} iconColor={colors.text} containerColor={colors.error} size={fontSizes.sm} />
                    </>
                    : <IconButton icon='pencil' onPress={() => setEdit(true)} iconColor={colors.text} containerColor={colors.primary} size={fontSizes.sm} />
                }
            </View>
        </View>
    );
};

export default FirstNameProfile;
