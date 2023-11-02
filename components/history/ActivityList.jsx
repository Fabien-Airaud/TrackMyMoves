import { useTheme } from '@react-navigation/native';
import { ListItem } from '@rneui/themed';
import { StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import { Button } from '@rneui/themed';

import Accordion from './Accordion';
import { formatTime } from '../move/FormatTime';
import { deleteLocalActivity } from './HistoryFunctions';

const ActivityList = ({ list }) => {
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
        await deleteLocalActivity(accountId, activityType, activityId)
            .then(() => console.log('Activity deleted'), () => console.log('Failed to delete activity'));
    }

    return list.map((value, index) => {

        return (
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
                    const time = formatTime(lastInterval.endTime);

                    // Get start date in string
                    const startDate = new Date(activity.startDate);
                    const dateString = startDate.toLocaleString();

                    return (
                        <ListItem.Swipeable
                            key={num}
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