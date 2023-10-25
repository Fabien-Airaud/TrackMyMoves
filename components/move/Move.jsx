import { useState } from 'react';
import { StyleSheet, View } from "react-native";

import BottomMove from './BottomMove';
import CenterMove from './CenterMove';
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
    const [activityType, setActivityType] = useState(undefined);
    const [pageType, setPageType] = useState(MovePageType.start);
    const [timerStatus, setTimerStatus] = useState(TimerStatus.pause);

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

    return (
        <View style={styles.page}>
            <TopMove activityType={activityType} setActivityType={setActivityType} pageType={pageType} />
            <CenterMove activityType={activityType?.value} timerStatus={timerStatus} setTimerStatus={setTimerStatus} resetActivity={resetActivity} pageType={pageType} setPageType={setPageType} />
            <BottomMove pageType={pageType} timerStatus={timerStatus} />
        </View>
    );
};

export default Move;