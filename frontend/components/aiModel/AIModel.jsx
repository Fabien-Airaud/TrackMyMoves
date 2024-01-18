import { useTheme } from '@react-navigation/native';
import { StyleSheet, View, Text } from "react-native";


const AIModel = () => {
    // Style variables
    const { colors, fontSizes } = useTheme();
    const styles = StyleSheet.create({
        page: {
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center'
        },
        text: {
            color: colors.text
        }
    });

    return (
        <View style={styles.page}>
            <Text style={styles.text}>AI Model</Text>
        </View>
    );
};

export default AIModel;