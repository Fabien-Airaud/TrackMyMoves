import { useTheme } from '@react-navigation/native';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DropDown from 'react-native-paper-dropdown';

import Dropdown from '../Dropdown';

const TopMove = () => {
    // Variables
    const [showDropdown, setShowDropdown] = useState(false);

    // Activity dropdown list
    const items = [
        {
            label: 'Item 1',
            value: 'Item1'
        },
        {
            label: 'Item 2',
            value: 'Item2'
        },
        {
            label: 'Item 3',
            value: 'Item3'
        },
        {
            label: 'Item 4',
            value: 'Item4'
        }
    ]

    // Style variables
    const { colors, fontSizes } = useTheme();
    const styles = StyleSheet.create({
        section: {
            width: '80%',
            height: '30%',
            alignItems: 'center',
            justifyContent: 'center'
        },
        warningText: {
            color: colors.error,
            textAlign: 'center'
        },
        container: {
            marginTop: 10
        },
        dropdown: {
            margin: 10
        }
    });

    return (
        <View style={styles.section}>
            <Text style={styles.warningText}> Please note, the type of activity can no longer be modified after the activity has started </Text>
            <Dropdown width={120} containerStyle={styles.container} items={items} />
        </View>
    );
};

export default TopMove;