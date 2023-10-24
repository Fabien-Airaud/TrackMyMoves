import { useTheme } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';

import { MovePageType } from './Move';
import Dropdown from '../Dropdown';

const TopMove = ({ activityType, setActivityType, pageType }) => {
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
        activityText: {
            color: colors.text,
            fontSize: fontSizes.lg,
            textAlign: 'center'
        }
    });

    switch (pageType) {
        case MovePageType.start:
            return (
                <View style={styles.section}>
                    <Text style={styles.warningText}> Please note, the type of activity can no longer be modified after the activity has started </Text>
                    <Dropdown items={activityTypes} value={activityType} setValue={setActivityType} leadingIcon={true} width={120} containerStyle={styles.container} />
                </View>
            );

        case MovePageType.stop:
            return (
                <View style={styles.section}>
                    <Text style={styles.activityText}>Stop move page</Text>
                </View>
            );

        default:
            break;
    }

    
};

export default TopMove;