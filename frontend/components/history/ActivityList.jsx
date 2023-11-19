import { useTheme } from '@react-navigation/native';
import { Button, ListItem } from '@rneui/themed';
import { Alert, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';

import { formatTime } from '../move/FormatTime';
import Accordion from './Accordion';
import { deleteLocalActivity } from './HistoryFunctions';

const ActivityList = ({ list, navigation }) => {
    // Style variables
    const { colors } = useTheme();
    const styles = StyleSheet.create({
        listItem: {
            backgroundColor: colors.inputFill
        },
        title: {
            color: colors.text
        },
        subtitle: {
            color: colors.placeholder
        }
    });

    const dispatchDeleteActivity = async (accountId, activityType, activityId) => {
        Alert.alert(
            'Delete activity',
            'Are you sure you want to delete this activity?',
            [
                {
                    text: 'Delete',
                    onPress: async () => {
                        await deleteLocalActivity(accountId, activityType, activityId);
                        navigation.reset({ index: 0, routes: [{ name: 'History' }] }); // Refresh history page to update list
                    }
                },
                { text: 'Cancel' }
            ],
            { cancelable: true }
        );
    }

    return list.map((value, index) => {
        if (value.activities.length > 0) return (
            <Accordion
                key={index}
                content={<>
                    <IconButton icon={value.leadingIcon} iconColor={colors.text} />
                    <ListItem.Content>
                        <ListItem.Title style={styles.title}> {value.label} </ListItem.Title>
                    </ListItem.Content>
                </>}
                icon={<IconButton icon='chevron-down' iconColor={colors.text} />}
                bottomDivider={true}
                children={value.activities.map((activity, num) => {
                    // Get elapsed time (in the last interval) in string formatted
                    const lastInterval = activity.intervals[activity.intervals.length - 1];
                    const time = formatTime(lastInterval.endTime, false);

                    // Get start date in string
                    const startDate = new Date(activity.startDate);
                    const dateString = startDate.toLocaleString();

                    return (
                        <ListItem.Swipeable
                            key={num}
                            leftContent={() => (
                                <Button
                                    title='Infos'
                                    onPress={() => navigation.navigate("Informations")}
                                    icon={{ name: 'info', color: 'white' }}
                                    titleStyle={{ fontWeight: 'bold' }}
                                    buttonStyle={{ minHeight: '100%' }}
                                />
                            )}
                            rightContent={() => (
                                <Button
                                    title='Delete'
                                    onPress={() => dispatchDeleteActivity(activity.accountId, activity.activityType, activity.id)}
                                    icon={{ name: 'delete', color: 'white' }}
                                    color={colors.error} titleStyle={{ fontWeight: 'bold' }}
                                    buttonStyle={{ minHeight: '100%' }}
                                />
                            )}
                            containerStyle={styles.listItem}
                            bottomDivider={true}>
                            <ListItem.Content>
                                <ListItem.Title style={styles.title}> {`${value.label} - ${time}`} </ListItem.Title>
                                <ListItem.Subtitle style={styles.subtitle}> {dateString} </ListItem.Subtitle>
                            </ListItem.Content>
                            <ListItem.Chevron color={colors.text} />
                        </ListItem.Swipeable>
                    );
                })}
            />
        );
    })
};

export default ActivityList;