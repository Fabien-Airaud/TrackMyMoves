import { useTheme } from '@react-navigation/native';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Avatar, Divider, List, Surface } from 'react-native-paper';

import ActivityTypes from '../move/ActivityTypes';
import { formatTime } from '../move/FormatTime';

const ActivityGeneral = ({ navigation, route: { params } }) => {
    // Activity type
    const activityType = ActivityTypes.find((activityType) => activityType.value == params.activityType);
    const startDate = new Date(params.startDate);
    const endDate = new Date(params.endDate);
    const totalTime = formatTime(params.intervals[params.intervals.length - 1].endTime, false);
    const elapsedTime = formatTime(endDate - startDate, false);

    // Style variables
    const { colors, fontSizes } = useTheme();
    const styles = StyleSheet.create({
        page: {
            minHeight: '100%',
            width: '100%',
            backgroundColor: colors.background
        },
        text: {
            color: colors.text,
            fontSize: fontSizes.md
        },
        listTitle: {
            fontSize: fontSizes.md
        }
    });

    return (
        <ScrollView style={styles.page}>
            <View style={{ flexDirection: 'row' }}>
                <Avatar.Icon icon={activityType.leadingIcon} size={100} color={colors.text} style={{ backgroundColor: colors.background }} />
                <View style={{ justifyContent: 'space-evenly' }}>
                    <Text style={[styles.text, { fontSize: fontSizes.xl }]}>{activityType.label}</Text>
                    <Text style={styles.text}>{new Date(params.startDate).toDateString()}</Text>
                </View>
            </View>

            <List.Section style={{ marginBottom: 20 }}>
                <List.Subheader>Time</List.Subheader>
                <Surface mode='flat' elevation={1} style={{ backgroundColor: colors.surface }}>
                    <List.Item
                        title={startDate.toLocaleTimeString()}
                        description="Start time"
                        titleStyle={styles.listTitle}
                    />
                    <Divider />
                    <List.Item
                        title={endDate.toLocaleTimeString()}
                        description="End time"
                        titleStyle={styles.listTitle}
                    />
                    <Divider />
                    <List.Item
                        title={totalTime}
                        description="Total time"
                        titleStyle={styles.listTitle}
                    />
                    <Divider />
                    <List.Item
                        title={elapsedTime}
                        description="Elapsed time"
                        titleStyle={styles.listTitle}
                    />
                </Surface>
            </List.Section>
        </ScrollView>
    );
};

export default ActivityGeneral;