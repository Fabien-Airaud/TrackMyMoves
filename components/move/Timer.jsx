import { useTheme } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from "react-native";

import { formatTime } from './FormatTime';
import { TimerStatus } from './Move';

const Timer = ({ status }) => {
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

    // Timer functions
    useEffect(() => {
        // Implementing the setInterval method
        let timerId;
        if (status === TimerStatus.play) {
            timerId = setInterval(() => {
                setTime((time) => time + 10);
            }, 10);
        } else {
            clearInterval(timerId);
        }

        return () => clearInterval(timerId);
    }, [status])

    return (
        <View>
            <Text style={styles.text}> {formatTime(time)} </Text>
        </View>
    );
};

export default Timer;