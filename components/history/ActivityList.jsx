import { useTheme } from '@react-navigation/native';
import { ListItem } from '@rneui/themed';
import { StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';

import Accordion from './Accordion';
import { formatTime } from '../move/FormatTime';

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
                        <ListItem key={num} containerStyle={styles.listItem} bottomDivider={true}>
                            <ListItem.Content>
                                <ListItem.Title style={styles.title}> {`${value.label} - ${time}`} </ListItem.Title>
                                <ListItem.Subtitle style={styles.subtitle}> {dateString} </ListItem.Subtitle>
                            </ListItem.Content>
                            <ListItem.Chevron color={colors.text} />
                        </ListItem>
                    );
                })}
            />
        );
    })
};

export default ActivityList;