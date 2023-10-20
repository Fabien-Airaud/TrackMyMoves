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
        }
    });

    return (
        <View style={styles.section}>
            <Text> Top </Text>
        </View>
    );
};

export default TopMove;