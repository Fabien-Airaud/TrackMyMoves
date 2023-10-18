import { useTheme } from '@react-navigation/native';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { IconButton, TextInput, List } from 'react-native-paper';

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
            flexWrap: 'wrap',
            width: '100%',
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
                <List.Section>
                    <View style={[styles.view, {paddingHorizontal: 5, minWidth: 3*fontSizes.sm}]}>
                        {edit ?
                            <>
                                <IconButton icon='check-bold' onPress={() => setEdit(false)} iconColor={colors.text} containerColor={colors.success} size={fontSizes.sm} />
                                <IconButton icon='close-thick' onPress={() => setEdit(false)} iconColor={colors.text} containerColor={colors.error} size={fontSizes.sm} />
                            </>
                        :   <IconButton icon='pencil' onPress={() => setEdit(true)} iconColor={colors.text} containerColor={colors.primary} size={fontSizes.sm} />
                        }
                    </View>
                </List.Section>
            </View>
    );
};

export default DataProfile;
