import { useTheme } from '@react-navigation/native';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import { changeAccount } from '../../redux/apiAccountSlice';
import { patchAccountAPI } from '../APIFunctions';
import Helper from '../Helper';

const LastNameProfile = () => {
    // Logged account stored in redux
    const apiAccount = useSelector((state) => state.apiAccount);

    // state variables
    const [edit, setEdit] = useState(false);
    const [value, setValue] = useState(apiAccount.account.last_name);
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

    const updateLastName = () => {
        if (apiAccount.account.last_name !== value) {
            patchAccountAPI(apiAccount.token, apiAccount.account.id, { last_name: value })
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
                <TextInput
                    label={edit ? 'Last name' : ''}
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
                            <IconButton icon='check-bold' onPress={updateLastName} iconColor={colors.text} containerColor={colors.success} size={fontSizes.sm} />
                            <IconButton icon='close-thick' onPress={() => { setEdit(false); setValue(apiAccount.account.last_name); }} iconColor={colors.text} containerColor={colors.error} size={fontSizes.sm} />
                        </>
                        : <IconButton icon='pencil' onPress={() => setEdit(true)} iconColor={colors.text} containerColor={colors.primary} size={fontSizes.sm} />
                    }
                </View>
            </View>
            <Helper visible={helpers && helpers.last_name} message={helpers && helpers.last_name ? helpers.last_name : ''} />
        </View>
    );
};

export default LastNameProfile;
