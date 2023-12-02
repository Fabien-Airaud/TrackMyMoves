import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from 'react-redux';

import Timer from './Timer';
import { playTimerInterval, pauseTimerInterval } from "../../redux/apiActivitySlice";

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


    const dispatch = useDispatch();

    // Add a play time to activity interval
    const dispatchPlayTimerInterval = (playTime) => {
        dispatch(playTimerInterval({ playTime: playTime }));
    };

    // Add a pause time to activity interval
    const dispatchPauseTimerInterval = (pauseTime) => {
        dispatch(pauseTimerInterval({ pauseTime: pauseTime }));
    };

    return (
        <View style={styles.section}>
            <Timer activityState={apiActivity.current_state} dispatchPlayTimer={dispatchPlayTimerInterval} dispatchPauseTimer={dispatchPauseTimerInterval} />
        </View>
    );
};

export default BottomMove;