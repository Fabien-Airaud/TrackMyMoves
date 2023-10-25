import { useTheme } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from "react-native";

import { formatTime } from './FormatTime';

const Timer = ({ play }) => {
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
        let timerId;
        if (play) {
            timerId = setInterval(() => {
                setTime((time) => time + 10);
            }, 10);
        }
    }, [play])

    return (
        <View>
            <Text style={styles.text}> {formatTime(time)} </Text>
        </View>
    );
};

export default Timer;