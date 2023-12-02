import { useTheme } from '@react-navigation/native';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Divider, Menu, TextInput, TouchableRipple } from 'react-native-paper';

const Dropdown = ({ items, initialValue = undefined, onChangeValue = () => {}, leadingIcon = false, width, containerStyle }) => {
    // State variables
    const [value, setValue] = useState(initialValue);
    const [visible, setVisible] = useState(false);

    // Style variables
    const { colors } = useTheme();
    const styles = StyleSheet.create({
        input: {
            backgroundColor: colors.inputFill,
            marginVertical: '2%',
            paddingHorizontal: 10
        },
        touchableRipple: {
            width: width ? 215 * width / 100 : 215,
            height: 'auto'
        },
        item: {
            backgroundColor: colors.inputFill,
            color: colors.text
        }
    });

    // Action when select is pressed
    const pressSelect = () => {
        if (visible) {
            setVisible(false);
        } else {
            setVisible(true);
        }
    };

    // Action when item is pressed
    const pressItem = (item) => {
        setValue(item);
        onChangeValue(item);
        setVisible(false);
    };

    return (
        <Menu
            visible={visible}
            onDismiss={pressSelect}
            anchor={
                <TouchableRipple onPress={pressSelect} style={[containerStyle, styles.touchableRipple]}>
                    <View pointerEvents='none'>
                        <TextInput
                            label='Activity type'
                            placeholder='Select activity type'
                            value={value ? value.label : ''}
                            mode='text'
                            textColor={colors.text}
                            theme={{ colors: { primary: colors.primary, onSurfaceVariant: value ? colors.primary : colors.placeholder } }}
                            style={styles.input}
                        />
                    </View>
                </TouchableRipple>
            }
            anchorPosition='bottom'
            style={{ width: width ? 215 * width / 100 : 215 }}
            contentStyle={{ backgroundColor: colors.inputFill }}>
            {items.map((item, index) => {
                if (index == items.length - 1) return (
                    <View key={index}>
                        <Menu.Item leadingIcon={leadingIcon ? item.leading_icon : ''} onPress={() => pressItem(item)} title={item.label} theme={{ colors: { onSurface: colors.text, onSurfaceVariant: colors.text } }} />
                    </View>);
                else return (
                    <View key={index}>
                        <Menu.Item leadingIcon={leadingIcon ? item.leading_icon : ''} onPress={() => pressItem(item)} title={item.label} theme={{ colors: { onSurface: colors.text, onSurfaceVariant: colors.text } }} />
                        <Divider />
                    </View>);
            })}
        </Menu>
    );
};

export default Dropdown;