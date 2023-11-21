import { useTheme } from '@react-navigation/native';
import { ListItem } from '@rneui/themed';
import { useState } from 'react';
import { StyleSheet } from 'react-native';

const Accordion = ({ content, icon, bottomDivider, children }) => {
    // State variable
    const [expanded, setExpanded] = useState(false);

    // Style variables
    const { colors } = useTheme();
    const styles = StyleSheet.create({
        accordion: {
            borderBottomWidth: 2,
            backgroundColor: colors.surface
        }
    });

    return (
        <ListItem.Accordion
            content={content}
            isExpanded={expanded}
            onPress={() => setExpanded(!expanded)}
            icon={icon}
            bottomDivider={bottomDivider}
            containerStyle={styles.accordion}
        >
            {children}
        </ListItem.Accordion>
    );
};

export default Accordion;