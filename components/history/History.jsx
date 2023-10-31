import { useTheme } from '@react-navigation/native';
import { ListItem } from '@rneui/themed';
import { IconButton } from 'react-native-paper';
import { ScrollView, StyleSheet } from 'react-native';
import { ListItemChevron } from '@rneui/base/dist/ListItem/ListItem.Chevron';

const History = () => {
    // Style variables
    const { colors, fontsizes } = useTheme();
    const styles = StyleSheet.create({
        page: {
            minHeight: '100%',
            width: '100%',
            padding: '5%',
            backgroundColor: colors.background
        },
        listItem: {
            padding: 5,
            backgroundColor: colors.inputFill
        },
        text: {
            color: colors.text
        }
    });

    return (
        <ScrollView style={styles.page}>
            <ListItem containerStyle={styles.listItem} bottomDivider={true}>
                <IconButton icon='clock' iconColor={colors.text} />
                <ListItem.Content>
                    <ListItem.Title style={styles.text}>Activity type 1</ListItem.Title>
                </ListItem.Content>
                <ListItemChevron color={colors.text} />
            </ListItem>
            <ListItem containerStyle={styles.listItem}>
                <IconButton icon='clock' iconColor={colors.text} />
                <ListItem.Content>
                    <ListItem.Title style={styles.text}>Activity type 2</ListItem.Title>
                </ListItem.Content>
                <ListItemChevron color={colors.text} />
            </ListItem>
        </ScrollView>
    );
};

export default History;