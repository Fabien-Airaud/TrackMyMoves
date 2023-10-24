import { useTheme } from '@react-navigation/native';
import { StyleSheet, Text, View } from "react-native";

const Timer = () => {
    // Time variables

    // Style variables
    const { colors, fontSizes } = useTheme();
    const styles = StyleSheet.create({
        timer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
        },
        text: {
            color: colors.text,
            fontSize: fontSizes.xl
        }
    });
    
    return (
        <View>
            <Text style={styles.text}> Timer </Text>
        </View>
    );
};

export default Timer;