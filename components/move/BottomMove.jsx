import { useTheme } from '@react-navigation/native';
import { StyleSheet, Text, View } from "react-native";

const BottomMove = () => {
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
            <Text> Bottom </Text>
        </View>
    );
};

export default BottomMove;