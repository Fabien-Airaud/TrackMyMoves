import { useTheme } from '@react-navigation/native';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import { changeAccount } from '../../redux/apiAccountSlice';
import { patchAccountAPI } from '../APIFunctions';
import Helper from '../Helper';

const HeightProfile = () => {
    // Logged account stored in redux
    const apiAccount = useSelector((state) => state.apiAccount);

    // state variables
    const [edit, setEdit] = useState(false);
    const [value, setValue] = useState(""+apiAccount.account.height);
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

    const updateHeight = () => {
        if (""+apiAccount.account.height !== value) {
            patchAccountAPI(apiAccount.token, apiAccount.account.id, { height: value })
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

    // const dispatchHeight = () => {
    //     if (/^\b\d{1,3}\b$/.test(value) && data !== value) {
    //         dispatch(
    //             updateHeight({
    //                 id: id,
    //                 height: value
    //             })
    //         );
    //         dispatch(updateLogHeight(value));
    //     } else {
    //         setValue(data);
    //     }
    //     setEdit(false);
    // };

    return (
        <View style={styles.colView}>
            <View style={styles.view}>
                <TextInput
                    label={edit ? 'Height (cm)' : ''}
                    value={value}
                    disabled={!edit}
                    onChangeText={number => setValue(number)}
                    inputMode='numeric'
                    textColor={colors.text}
                    theme={{ colors: { primary: colors.primary, onSurfaceVariant: colors.placeholder } }}
                    style={styles.input}
                />
                <View style={[styles.view, { paddingHorizontal: 5, width: 3 * fontSizes.sm }]}>
                    {edit ?
                        <>
                            <IconButton icon='check-bold' onPress={updateHeight} iconColor={colors.text} containerColor={colors.success} size={fontSizes.sm} />
                            <IconButton icon='close-thick' onPress={() => { setEdit(false); setValue(""+apiAccount.account.height); }} iconColor={colors.text} containerColor={colors.error} size={fontSizes.sm} />
                        </>
                        : <IconButton icon='pencil' onPress={() => setEdit(true)} iconColor={colors.text} containerColor={colors.primary} size={fontSizes.sm} />
                    }
                </View>
            </View>
            <Helper visible={helpers && helpers.height} message={helpers && helpers.height ? helpers.height : ''} />
        </View>
    );
};

export default HeightProfile;
