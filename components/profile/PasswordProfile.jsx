import { useTheme } from '@react-navigation/native';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, TextInput } from 'react-native-paper';
import { useDispatch } from 'react-redux';

import { updatePassword } from '../../redux/accountSlice';
import { updateLogPassword } from '../../redux/logInSlice';

const PasswordProfile = ({ id, data }) => {
    // state variables
    const [edit, setEdit] = useState(false);
    const [value, setValue] = useState(data);
    const [secured, setSecured] = useState(true);

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

    const dispatchPassword = () => {
        if (data !== value) {
            dispatch(
                updatePassword({
                    id: id,
                    password: value
                })
            );
            dispatch(
                updateLogPassword({
                    id: id,
                    password: value
                })
            );
            console.log(data + ' -> ' + value);
        }
        setEdit(false);
    };

    return (
        <View style={styles.view}>
            <TextInput
                label={edit ? 'Password' : ''}
                value={value}
                secureTextEntry={secured}
                disabled={!edit}
                onChangeText={text => setValue(text)}
                right={<TextInput.Icon icon={secured ? 'eye' : 'eye-off'} onPress={() => setSecured(!secured)} color={colors.placeholder} />}
                inputMode={'text'}
                textColor={colors.text}
                theme={{ colors: { primary: colors.primary, onSurfaceVariant: colors.placeholder } }}
                style={styles.input}
            />
            <View style={[styles.view, { paddingHorizontal: 5, width: 3 * fontSizes.sm }]}>
                {edit ?
                    <>
                        <IconButton icon='check-bold' onPress={() => dispatchPassword()} iconColor={colors.text} containerColor={colors.success} size={fontSizes.sm} />
                        <IconButton icon='close-thick' onPress={() => { setEdit(false); setValue(data); }} iconColor={colors.text} containerColor={colors.error} size={fontSizes.sm} />
                    </>
                    : <IconButton icon='pencil' onPress={() => setEdit(true)} iconColor={colors.text} containerColor={colors.primary} size={fontSizes.sm} />
                }
            </View>
        </View>
    );
};

export default PasswordProfile;
