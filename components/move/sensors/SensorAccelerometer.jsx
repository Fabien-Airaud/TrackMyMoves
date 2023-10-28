import { Accelerometer } from 'expo-sensors';
import { useEffect, useState } from 'react';

import { TimerStatus } from '../Move';

const SensorAccelerometer = ({ timerStatus }) => {
    const [accelInter, setAccelInter] = useState({
        startDate: '',
        interval: []
    });
    const [subscription, setSubscription] = useState(null);

    // Add a data in accelerometer interval using the setter
    const addIntervalData = (intervalData) => {
        return setAccelInter(prevData => ({
            ...prevData,
            interval: prevData.interval ? [...prevData.interval, intervalData] : []
        }))
    };

    const subscribe = () => {
        Accelerometer.setUpdateInterval(1000);
        setSubscription(Accelerometer.addListener(addIntervalData));
    };

    const unsubscribe = () => {
        subscription && subscription.remove();
        setSubscription(null);
    };

    // Subscribe and add start date in interval
    const startInterval = () => {
        subscribe();

        // Init accelerometer interval with start date
        const startDate = new Date();
        setAccelInter({
            startDate: startDate.toISOString(),
            interval: []
        });
    }

    // Unsubscribe to end interval
    const endInterval = () => {
        console.log(accelInter);
        unsubscribe();
    }

    useEffect(() => {
        if (timerStatus === TimerStatus.play) startInterval(); // when play button pressed
        else if (timerStatus === TimerStatus.pause) endInterval(); // when pause or stop button pressed
    }, [timerStatus]);
};

export default SensorAccelerometer;