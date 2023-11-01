import { useTheme } from '@react-navigation/native';
import { ListItem } from '@rneui/themed';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';

import { ActivityTypes } from "../move/TopMove";

const ActivityList = ({ list }) => {
    // State variables
    const [expanded, setExpanded] = useState(false);

    // Style variables
    const { colors } = useTheme();
    const styles = StyleSheet.create({
        accordion: {
            borderBottomWidth: 2,
            backgroundColor: colors.inputFill
        },
        listItem: {
            backgroundColor: colors.inputFill
        },
        text: {
            color: colors.text
        }
    });

    return list.map((value, index) => {
        const activityType = ActivityTypes.find(type => type.value === value);
        console.log(activityType);

        return (
            <ListItem.Accordion
                key={index}
                content={<>
                    <IconButton icon={activityType.leadingIcon} iconColor={colors.text} />
                    <ListItem.Content>
                        <ListItem.Title style={styles.text}> {activityType.label} </ListItem.Title>
                    </ListItem.Content>
                </>}
                isExpanded={expanded}
                // onPress={() => {setExpanded(!expanded)}}
                icon={<IconButton icon='chevron-down' iconColor={colors.text} />}
                bottomDivider={true}
                containerStyle={styles.accordion}
            >
                <ListItem containerStyle={styles.listItem} bottomDivider={true}>
                    <ListItem.Content>
                        <ListItem.Title style={styles.text}>Activity 1</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron color={colors.text} />
                </ListItem>
                <ListItem containerStyle={styles.listItem}>
                    <ListItem.Content>
                        <ListItem.Title style={styles.text}>Activity 2</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron color={colors.text} />
                </ListItem>
            </ListItem.Accordion>
        )
    })
};

export default ActivityList;