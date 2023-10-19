import { useTheme } from '@react-navigation/native';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, TextInput } from 'react-native-paper';
import { useDispatch } from 'react-redux';

import { updateHeight } from '../../redux/accountSlice';
import { updateLogHeight } from '../../redux/logInSlice';

const HeightProfile = ({ id, data }) => {
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

    const dispatchHeight = () => {
        if (/^\b\d{1,3}\b$/.test(value) && data !== value) {
            dispatch(
                updateHeight({
                    id: id,
                    height: value
                })
            );
            dispatch(
                updateLogHeight({
                    id: id,
                    height: value
                })
            );
            console.log(data + ' -> ' + value);
        } else {
            setValue(data);
        }
        setEdit(false);
    };

    return (
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
                        <IconButton icon='check-bold' onPress={() => dispatchHeight()} iconColor={colors.text} containerColor={colors.success} size={fontSizes.sm} />
                        <IconButton icon='close-thick' onPress={() => { setEdit(false); setValue(data); }} iconColor={colors.text} containerColor={colors.error} size={fontSizes.sm} />
                    </>
                    : <IconButton icon='pencil' onPress={() => setEdit(true)} iconColor={colors.text} containerColor={colors.primary} size={fontSizes.sm} />
                }
            </View>
        </View>
    );
};

export default HeightProfile;
