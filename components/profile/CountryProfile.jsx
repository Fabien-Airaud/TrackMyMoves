import { useTheme } from '@react-navigation/native';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, TextInput } from 'react-native-paper';
import { useDispatch } from 'react-redux';

import { updateCountry } from '../../redux/accountSlice';
import { updateLogCountry } from '../../redux/logInSlice';

const CountryProfile = ({ id, data }) => {
    // state variables
    const [edit, setEdit] = useState(false);
    const [value, setValue] = useState(data);

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

    const dispatchCountry = () => {
        if (data !== value) {
            dispatch(
                updateCountry({
                    id: id,
                    country: value
                })
            );
            dispatch(
                updateLogCountry({
                    id: id,
                    country: value
                })
            );
            console.log(data + ' -> ' + value);
        }
        setEdit(false);
    };

    return (
        <View style={styles.view}>
            <TextInput
                label={edit ? 'Country' : ''}
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
                        <IconButton icon='check-bold' onPress={() => dispatchCountry()} iconColor={colors.text} containerColor={colors.success} size={fontSizes.sm} />
                        <IconButton icon='close-thick' onPress={() => { setEdit(false); setValue(data); }} iconColor={colors.text} containerColor={colors.error} size={fontSizes.sm} />
                    </>
                    : <IconButton icon='pencil' onPress={() => setEdit(true)} iconColor={colors.text} containerColor={colors.primary} size={fontSizes.sm} />
                }
            </View>
        </View>
    );
};

export default CountryProfile;
