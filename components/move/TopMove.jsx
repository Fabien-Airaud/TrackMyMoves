import { useTheme } from '@react-navigation/native';
import { StyleSheet, Text, View } from "react-native";

const TopMove = () => {
    // Style variables
    const { colors, fontSizes } = useTheme();
    const styles = StyleSheet.create({
        section: {
            width: '80%',
            height: '30%',
            alignItems: 'center',
            justifyContent: 'center'
        },
        warningText: {
            color: colors.error
        }
    });

    return (
        <View style={styles.section}>
            <Text style={styles.warningText}> Please note, the type of activity can no longer be modified after the activity has started </Text>
        </View>
    );
};

export default TopMove;