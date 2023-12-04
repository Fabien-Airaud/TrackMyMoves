import { useTheme } from '@react-navigation/native';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Avatar, Divider, List, Surface } from 'react-native-paper';
import { useSelector } from 'react-redux';

import { formatTime } from '../move/FormatTime';

const ActivityGeneral = () => {
    // Activity infos stored in redux
    const activity = useSelector((state) => state.apiActivityInfos);

    // Activity type
    const activityType = activity.activity_type;
    const startDate = new Date(activity.start_datetime);
    const endDate = new Date(activity.end_datetime);
    const totalTime = formatTime(activity.total_time, false);
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
                <Avatar.Icon icon={activityType.leading_icon} size={100} color={colors.text} style={{ backgroundColor: colors.background }} />
                <View style={{ justifyContent: 'space-evenly' }}>
                    <Text style={[styles.text, { fontSize: fontSizes.xl }]}>{activityType.label}</Text>
                    <Text style={styles.text}>{startDate.toDateString()}</Text>
                </View>
            </View>

            <List.Section style={{ marginBottom: 20 }}>
                <List.Subheader>Time</List.Subheader>
                <Surface mode='flat' elevation={1} style={{ backgroundColor: colors.surface }}>
                    <List.Item
                        title={startDate.toLocaleTimeString()}
                        description="Start"
                        titleStyle={styles.listTitle}
                    />
                    <Divider />
                    <List.Item
                        title={endDate.toLocaleTimeString()}
                        description="End"
                        titleStyle={styles.listTitle}
                    />
                    <Divider />
                    <List.Item
                        title={totalTime}
                        description="Total"
                        titleStyle={styles.listTitle}
                    />
                    <Divider />
                    <List.Item
                        title={elapsedTime}
                        description="Elapsed"
                        titleStyle={styles.listTitle}
                    />
                </Surface>
            </List.Section>
        </ScrollView>
    );
};

export default ActivityGeneral;