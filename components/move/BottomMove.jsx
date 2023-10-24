import { useTheme } from '@react-navigation/native';
import { StyleSheet, Text, View } from "react-native";

import { MovePageType } from './Move';

const BottomMove = ({ pageType }) => {
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
            color: colors.error,
            textAlign: 'center'
        }
    });

    switch (pageType) {
        case MovePageType.start:
            return (
                <View style={styles.section}>
                    <Text> Start bottom </Text>
                </View>
            );

        case MovePageType.stop:
            return (
                <View style={styles.section}>
                    <Text style={styles.warningText}> Please note, if you stop the activity you will not be able to continue it </Text>
                </View>
            );

        default:
            break;
    };
};

export default BottomMove;