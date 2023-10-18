import { useTheme } from '@react-navigation/native';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { TextInput } from 'react-native-paper';

const DataProfile = ({ label, data, secureTextEntry, inputMode }) => {
    // state variables
    const [edit, setEdit] = useState(false);
    const [value, setValue] = useState(data);

    // Style variables
    const { colors, fontSizes } = useTheme();
    const styles = StyleSheet.create({
        view: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '90%',
        },
        text: {
            color: colors.text,
            fontSize: fontSizes.sm
        },
        input: {
            backgroundColor: colors.inputFill,
            marginVertical: '2%'
        }
    });

    return (
        <View style={styles.view}>
            <TextInput
                label={edit ? label : ''}
                value={value}
                disabled={!edit}
                secureTextEntry={false || secureTextEntry}
                onChangeText={text => setValue(text)}
                inputMode={inputMode}
                textColor={colors.text}
                theme={{ colors: { primary: colors.primary, onSurfaceVariant: colors.placeholder } }}
                style={styles.input}
            />
            <IconButton icon='pencil' onPress={() => setEdit(true)} iconColor={colors.text} containerColor={colors.primary} size={fontSizes.sm} />
        </View>
    );
};

export default DataProfile;
