import { useTheme } from '@react-navigation/native';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Divider, Menu, TextInput, TouchableRipple } from 'react-native-paper';

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
    const [visible, setVisible] = useState(false);
    const [labelColor, setLabelColor] = useState(colors.placeholder);

    // Actions when select is pressed
    const pressSelect = () => {
        if (visible) {
            setVisible(false);
            setLabelColor(colors.placeholder);
        } else {
            setVisible(true);
            setLabelColor(colors.primary);
        }
    };

    return (
        <Menu
            visible={visible}
            onDismiss={pressSelect}
            anchor={
                <TouchableRipple onPress={pressSelect} style={containerStyle}>
                    <View pointerEvents='none'>
                        <TextInput
                            label='Activity type'
                            placeholder='Select activity type'
                            value='Item 1'
                            editable={false}
                            textColor={colors.text}
                            theme={{ colors: { primary: colors.primary, onSurfaceVariant: labelColor } }}
                            onPressIn={() => changeLabelColor()}
                            style={styles.input}
                        />
                    </View>
                </TouchableRipple>
            }>
            <Menu.Item onPress={() => { }} title="Item 1" />
            <Menu.Item onPress={() => { }} title="Item 2" />
            <Divider />
            <Menu.Item onPress={() => { }} title="Item 3" />
        </Menu>

    );
};

export default Dropdown;