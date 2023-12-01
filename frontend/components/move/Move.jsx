import { useState } from 'react';
import { StyleSheet, View } from "react-native";
import { useDispatch } from 'react-redux';

import { addSensorsInterval, pauseInterval, playInterval } from '../../redux/currentActivitySlice';
import BottomMove from './BottomMove';
import CenterMove from './CenterMove';
import Sensors from './Sensors';
import TopMove from './TopMove';

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
            <TopMove pageType={pageType} />
            <CenterMove timerStatus={timerStatus} setTimerStatus={setTimerStatus} resetActivity={resetActivity} />
            <BottomMove pageType={pageType} timerStatus={timerStatus} dispatchPlayTimer={dispatchPlayTimer} dispatchPauseTimer={dispatchPauseTimer} />
        </View>
    );
};

export default Move;