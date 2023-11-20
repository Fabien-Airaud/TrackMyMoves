import { useTheme } from '@react-navigation/native';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Avatar, Button, Card } from 'react-native-paper';

import ActivityTypes from '../move/ActivityTypes';

const ActivityGeneral = ({ navigation, route: { params } }) => {
    // Activity type
    const activityType = ActivityTypes.find((activityType) => activityType.value == params.activityType);

    // Style variables
    const { colors, fontSizes } = useTheme();
    const styles = StyleSheet.create({
        page: {
            minHeight: '100%',
            width: '100%',
            padding: '5%',
            backgroundColor: colors.background
        },
        text: {
            color: colors.text,
            fontSize: fontSizes.md
        }
    });

    return (
        <ScrollView style={styles.page}>
            <View style={{flexDirection: 'row', marginBottom: 20}}>
                <Avatar.Icon icon={activityType.leadingIcon} size={100} color={colors.text} style={{backgroundColor: colors.background}} />
                <View style={{justifyContent: 'space-evenly'}}>
                    <Text style={[styles.text, {fontSize: fontSizes.xl}]}>{activityType.label}</Text>
                    <Text style={styles.text}>{new Date(params.startDate).toDateString()}</Text>
                </View>
            </View>
            <Text style={styles.text}>{JSON.stringify(params)}</Text>
        </ScrollView>
    );
};

export default ActivityGeneral;