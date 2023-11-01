import { useTheme } from '@react-navigation/native';
import { ListItem } from '@rneui/themed';
import { StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';

import Accordion from './Accordion';

const ActivityList = ({ list }) => {
    // Style variables
    const { colors } = useTheme();
    const styles = StyleSheet.create({
        listItem: {
            backgroundColor: colors.inputFill
        },
        text: {
            color: colors.text
        }
    });

    return list.map((value, index) => {

        return (
            <Accordion
                key={index}
                content={<>
                    <IconButton icon={value.leadingIcon} iconColor={colors.text} />
                    <ListItem.Content>
                        <ListItem.Title style={styles.text}> {value.label} </ListItem.Title>
                    </ListItem.Content>
                </>}
                icon={<IconButton icon='chevron-down' iconColor={colors.text} />}
                bottomDivider={true}
                children={<>
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
                </>}
            />
        );
    })
};

export default ActivityList;