import { useTheme } from '@react-navigation/native';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, TouchableRipple } from 'react-native-paper';

const Dropdown = ({ containerStyle }) => {
    // Style variables
    const { colors, fontSizes } = useTheme();
    const styles = StyleSheet.create({
        input: {
            flex: 1,
            // width: '100%',
            backgroundColor: colors.inputFill,
            marginVertical: '2%',
            paddingHorizontal: 10
        }
    });

    // Variables
    const [labelColor, setLabelColor] = useState(colors.placeholder);

    // Actions when select is pressed
    const pressSelect = () => {
        if (labelColor === colors.placeholder) {
            setLabelColor(colors.primary);
        } else {
            setLabelColor(colors.placeholder);
        }
    };

    return (
        <TouchableRipple onPress={() => pressSelect()} style={containerStyle}>
            <View pointerEvents='none'>
                <TextInput
                    label='Activity type'
                    placeholder='Select activity type'
                    value='Test1'
                    editable={false}
                    textColor={colors.text}
                    theme={{ colors: { primary: colors.primary, onSurfaceVariant: labelColor } }}
                    onPressIn={() => changeLabelColor()}
                    style={styles.input}
                />
            </View>
        </TouchableRipple>
    );
};

export default Dropdown;