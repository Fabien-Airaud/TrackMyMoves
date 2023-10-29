import { useTheme } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import { IconButton } from 'react-native-paper';

import Dropdown from '../Dropdown';
import { MovePageType } from './Move';

const TopMove = ({ activityType, setActivityType, pageType }) => {
    // Activity dropdown list
    const activityTypes = [
        {
            label: 'Walking',
            value: 'walking',
            leadingIcon: 'walk'
        },
        {
            label: 'Running',
            value: 'running',
            leadingIcon: 'run'
        },
        {
            label: 'Cycling',
            value: 'cycling',
            leadingIcon: 'bike'
        },
        {
            label: 'Cardio',
            value: 'cardio',
            leadingIcon: 'timer'
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
            fontSize: fontSizes.md,
            textAlign: 'center'
        }
    });

    if (pageType === MovePageType.start) {
        return (
            <View style={styles.section}>
                <Text style={styles.warningText}> Please note, the type of activity can no longer be modified after the activity has started </Text>
                <Dropdown items={activityTypes} value={activityType} setValue={setActivityType} leadingIcon={true} width={120} containerStyle={styles.container} />
            </View>
        );
    } else {
        return (
            <View style={styles.section}>
                <IconButton icon={activityType.leadingIcon} iconColor={colors.text} size={fontSizes.medButton} />
                <Text style={styles.activityText}> {activityType.label} </Text>
            </View>
        );
    };
};

export default TopMove;