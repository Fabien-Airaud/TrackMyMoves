import { StyleSheet, View } from "react-native";

import Timer from './Timer';

const BottomMove = ({ pageType, timerStatus, dispatchPlayTimer }) => {
    // Style variables
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
            <Timer status={timerStatus} dispatchPlayTimer={dispatchPlayTimer} />
        </View>
    );
};

export default BottomMove;