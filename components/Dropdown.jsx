import { useTheme } from '@react-navigation/native';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Divider, Menu, TextInput, TouchableRipple } from 'react-native-paper';

const Dropdown = ({ containerStyle, width }) => {
    // Variables
    const [visible, setVisible] = useState(false);
    const [value, setValue] = useState('');

    // Style variables
    const { colors } = useTheme();
    const styles = StyleSheet.create({
        input: {
            flex: 1,
            backgroundColor: colors.inputFill,
            marginVertical: '2%',
            paddingHorizontal: 10
        },
        menu: {
            width: '100%'
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
    const pressItem = (itemValue) => {
        setValue(itemValue)
        setVisible(false);
    };

    return (
        <Menu
            visible={visible}
            onDismiss={pressSelect}
            anchor={
                <TouchableRipple onPress={pressSelect} style={[containerStyle, {width: width ? 215 * width / 100 : 215}]}>
                    <View pointerEvents='none'>
                        <TextInput
                            label='Activity type'
                            placeholder='Select activity type'
                            value={value}
                            mode='text'
                            textColor={colors.text}
                            theme={{ colors: { primary: colors.primary, onSurfaceVariant: value ? colors.primary : colors.placeholder } }}
                            style={styles.input}
                        />
                    </View>
                </TouchableRipple>
            }
            anchorPosition='bottom'
            style={{width: width ? 215 * width / 100 : 215}}>
                <Menu.Item onPress={() => pressItem('Item1')} title="Item 1" />
                <Divider />
                <Menu.Item onPress={() => pressItem('Item2')} title="Item 2" />
                <Divider />
                <Menu.Item onPress={() => pressItem('Item3')} title="Item 3" />
        </Menu>
    );
};

export default Dropdown;