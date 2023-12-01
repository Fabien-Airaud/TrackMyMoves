import { useTheme } from '@react-navigation/native';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import { changeAccount } from '../../redux/apiAccountSlice';
import { patchAccountAPI } from '../APIFunctions';
import Helper from '../Helper';

const PasswordProfile = () => {
    // Logged account stored in redux
    const apiAccount = useSelector((state) => state.apiAccount);

    // state variables
    const [edit, setEdit] = useState(false);
    const [value, setValue] = useState("");
    const [secured, setSecured] = useState(true);
    const [confirmValue, setConfirmValue] = useState("");
    const [confirmSecured, setConfirmSecured] = useState(true);
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
        verticalView: {
            width: '75%'
        },
        text: {
            color: colors.text,
            fontSize: fontSizes.sm
        },
        input: {
            width: '100%',
            backgroundColor: colors.inputFill,
            marginVertical: '2%',
            paddingHorizontal: 10
        }
    });

    // Dispatch account
    const dispatch = useDispatch();

    const updatePassword = () => {
        if (value === confirmValue) {
            if (value != "") {
                patchAccountAPI(apiAccount.token, apiAccount.account.id, { user: { password: value } })
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
            else setHelpers({ user: { password: ["password cannot be empty."] } });
        }
        else setHelpers({ user: { password: ["password and password confirmation should be the same."] } });

        setSecured(true);
        setConfirmSecured(true);
        setEdit(false);
    };

    return (
        <View style={styles.view}>
            <View style={styles.verticalView}>
                <TextInput
                    label={edit ? 'Password' : ''}
                    value={edit ? value : "a".repeat(16)}
                    secureTextEntry={secured}
                    disabled={!edit}
                    onChangeText={text => setValue(text)}
                    right={edit ? <TextInput.Icon icon={secured ? 'eye' : 'eye-off'} onPress={() => setSecured(!secured)} color={colors.placeholder} /> : undefined}
                    inputMode={'text'}
                    textColor={colors.text}
                    theme={{ colors: { primary: colors.primary, onSurfaceVariant: colors.placeholder } }}
                    style={styles.input}
                />
                <TextInput
                    label='Confirm password'
                    value={confirmValue}
                    secureTextEntry={confirmSecured}
                    onChangeText={text => setConfirmValue(text)}
                    right={<TextInput.Icon icon={confirmSecured ? 'eye' : 'eye-off'} onPress={() => setConfirmSecured(!confirmSecured)} color={colors.placeholder} />}
                    inputMode={'text'}
                    textColor={colors.text}
                    theme={{ colors: { primary: colors.primary, onSurfaceVariant: colors.placeholder } }}
                    style={edit ? styles.input : { display: 'none' }}
                />
                <Helper visible={helpers && helpers.user && helpers.user.password} message={helpers && helpers.user && helpers.user.password ? helpers.user.password : ''} />
            </View>
            <View style={[styles.view, { paddingHorizontal: 5, width: 3 * fontSizes.sm }]}>
                {edit ?
                    <>
                        <IconButton icon='check-bold' onPress={updatePassword} iconColor={colors.text} containerColor={colors.success} size={fontSizes.sm} />
                        <IconButton icon='close-thick' onPress={() => { setEdit(false); setValue(""); setConfirmValue("") }} iconColor={colors.text} containerColor={colors.error} size={fontSizes.sm} />
                    </>
                    : <IconButton icon='pencil' onPress={() => setEdit(true)} iconColor={colors.text} containerColor={colors.primary} size={fontSizes.sm} />
                }
            </View>
        </View>
    );
};

export default PasswordProfile;
