import { useTheme } from '@react-navigation/native';
import { ListItem } from '@rneui/themed';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useSelector } from 'react-redux';

import { getActivityTypes } from './HistoryFunctions';
import { ActivityTypes } from '../move/TopMove';

const History = ({ navigation }) => {
    // State variables
    const [unsubscribeFocus, setUnsubscribeFocus] = useState(() => { });
    const [expanded, setExpanded] = useState(false);
    const [list, setList] = useState([]);

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

    // Logged account stored in redux
    const logAcc = useSelector((state) => state.logIn.account);

    useEffect(() => {
        (async () => {
            const unsubscribe = await navigation.addListener('focus', async () => {
                setList(await getActivityTypes(logAcc.id));
            });
            setUnsubscribeFocus(unsubscribe);
        })(setUnsubscribeFocus, setList);

        return unsubscribeFocus;
    }, [navigation]);

    return (
        <ScrollView style={styles.page}>
            {
                list.map((value, index) => {
                    return (
                        <ListItem.Accordion
                            key={index}
                            content={<>
                                <IconButton icon='clock' iconColor={colors.text} />
                                <ListItem.Content>
                                    <ListItem.Title style={styles.text}> {value} </ListItem.Title>
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
            }
        </ScrollView>
    );
};

export default History;