import { useTheme } from '@react-navigation/native';
import { useState } from 'react';
import { ListItem } from '@rneui/themed';
import { IconButton } from 'react-native-paper';
import { ScrollView, StyleSheet } from 'react-native';
import { ListItemChevron } from '@rneui/base/dist/ListItem/ListItem.Chevron';

const History = () => {
    // State variables
    const [expanded, setExpanded] = useState(false);

    // Style variables
    const { colors, fontsizes } = useTheme();
    const styles = StyleSheet.create({
        page: {
            minHeight: '100%',
            width: '100%',
            padding: '5%',
            backgroundColor: colors.background
        },
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

    return (
        <ScrollView style={styles.page}>
            <ListItem.Accordion
                content={
                    <>
                        <IconButton icon='clock' iconColor={colors.text} />
                        <ListItem.Content>
                            <ListItem.Title style={styles.text}>List Accordion</ListItem.Title>
                        </ListItem.Content>
                    </>
                }
                isExpanded={expanded}
                onPress={() => {
                    setExpanded(!expanded);
                }}
                icon={
                    <IconButton icon='chevron-down' iconColor={colors.text} />
                }
                bottomDivider={true}
                containerStyle={styles.accordion}
            >
                <ListItem containerStyle={styles.listItem} bottomDivider={true}>
                    {/* <IconButton icon='clock' iconColor={colors.text} /> */}
                    <ListItem.Content>
                        <ListItem.Title style={styles.text}>Activity type 1</ListItem.Title>
                    </ListItem.Content>
                    <ListItemChevron color={colors.text} />
                </ListItem>
                <ListItem containerStyle={styles.listItem}>
                    {/* <IconButton icon='clock' iconColor={colors.text} /> */}
                    <ListItem.Content>
                        <ListItem.Title style={styles.text}>Activity type 2</ListItem.Title>
                    </ListItem.Content>
                    <ListItemChevron color={colors.text} />
                </ListItem>

            </ListItem.Accordion>
        </ScrollView>
    );
};

export default History;