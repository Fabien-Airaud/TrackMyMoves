import { StyleSheet, View } from "react-native";
import { useSelector } from 'react-redux';

import Timer from './Timer';

const BottomMove = () => {
    // Current activity stored in redux
    const apiActivity = useSelector((state) => state.apiActivity);

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
            <Timer activityState={apiActivity.current_state} />
        </View>
    );
};

export default BottomMove;