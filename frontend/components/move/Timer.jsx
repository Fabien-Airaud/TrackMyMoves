import { useTheme } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from "react-native";

import { formatTime } from './FormatTime';
import { ActivityState } from '../../redux/apiActivitySlice';

const Timer = ({ activityState, dispatchPlayTimer, dispatchPauseTimer }) => {
    // Timer variables
    const [time, setTime] = useState(0);

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

    // Reset the timer to 0
    const resetTimer = () => {
        setTime(0);
    }

    // Timer functions
    useEffect(() => {
        // Implementing the setInterval method
        let timerId;
        if (activityState === ActivityState.ongoing) {
            if (dispatchPlayTimer) dispatchPlayTimer(time); 

            timerId = setInterval(() => {
                setTime((time) => time + 20);
            }, 20);
        } else {
            if ((activityState === ActivityState.paused || activityState === ActivityState.stopped) && dispatchPauseTimer) dispatchPauseTimer(time); 
            clearInterval(timerId);

            if (activityState === ActivityState.starting) resetTimer();
        }

        return () => clearInterval(timerId);
    }, [activityState])

    return (
        <View>
            <Text style={styles.text}> {formatTime(time)} </Text>
        </View>
    );
};

export default Timer;