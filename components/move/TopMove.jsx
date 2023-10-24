import { useTheme } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';

import Dropdown from '../Dropdown';

const TopMove = ({ activityType, setActivityType }) => {
    // Activity dropdown list
    const activityTypes = [
        {
            label: 'Walking',
            value: 'Walking',
            leadingIcon: 'walk'
        },
        {
            label: 'Running',
            value: 'Running',
            leadingIcon: 'run'
        },
        {
            label: 'Cycling',
            value: 'Cycling',
            leadingIcon: 'bike'
        },
        {
            label: 'Cardio',
            value: 'Cardio'
        }
    ]

    // Style variables
    const { colors } = useTheme();
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
        }
    });

    return (
        <View style={styles.section}>
            <Text style={styles.warningText}> Please note, the type of activity can no longer be modified after the activity has started </Text>
            <Dropdown items={activityTypes} value={activityType} setValue={setActivityType} leadingIcon={true} width={120} containerStyle={styles.container} />
        </View>
    );
};

export default TopMove;