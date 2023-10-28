import { useState } from 'react';
import { StyleSheet, View } from "react-native";
import { useDispatch } from 'react-redux';

import { pauseInterval, playInterval, addSensorsInterval } from '../../redux/currentActivitySlice';
import BottomMove from './BottomMove';
import CenterMove from './CenterMove';
import TopMove from './TopMove';
import Sensors from './Sensors';

// Type of move page to display
export const MovePageType = Object.freeze({
    start: 1,
    stop: 2,
    save: 3
});

// Status for timer
export const TimerStatus = Object.freeze({
    reset: -1,
    pause: 0,
    play: 1
});

const Move = () => {
    // State variables
    const [activityType, setActivityType] = useState(undefined);
    const [pageType, setPageType] = useState(MovePageType.start);
    const [timerStatus, setTimerStatus] = useState(TimerStatus.reset);

    // Style variables
    const styles = StyleSheet.create({
        page: {
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center'
        }
    });

    const resetActivity = () => {
        setActivityType(undefined);
        setPageType(MovePageType.start);
    }

    const dispatch = useDispatch();

    // Function to play timer
    const dispatchPlayTimer = (currentTime) => {
        const startDate = new Date();

        dispatch(
            playInterval({
                startDateInterval: startDate.toISOString(),
                startTimeInterval: currentTime
            })
        );
    };

    // Function to pause timer
    const dispatchPauseTimer = (currentTime) => {
        const endDate = new Date();

        dispatch(
            pauseInterval({
                endDateInterval: endDate.toISOString(),
                endTimeInterval: currentTime
            })
        );
    };

    // Add accelerometer interval to the current activity
    const dispatchSensorsInterval = (sensorsInterval) => {
        dispatch(
            addSensorsInterval(sensorsInterval)
        );
    };

    return (
        <View style={styles.page}>
            <Sensors timerStatus={timerStatus} dispatchSensorsInter={dispatchSensorsInterval} />
            <TopMove activityType={activityType} setActivityType={setActivityType} pageType={pageType} />
            <CenterMove activityType={activityType?.value} timerStatus={timerStatus} setTimerStatus={setTimerStatus} resetActivity={resetActivity} pageType={pageType} setPageType={setPageType} />
            <BottomMove pageType={pageType} timerStatus={timerStatus} dispatchPlayTimer={dispatchPlayTimer} dispatchPauseTimer={dispatchPauseTimer} />
        </View>
    );
};

export default Move;