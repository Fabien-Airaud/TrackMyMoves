import { Accelerometer } from 'expo-sensors';
import { useEffect, useState } from 'react';

import { TimerStatus } from '../Move';

const SensorAccelerometer = ({timerStatus}) => {
    const [{ x, y, z }, setData] = useState({
        x: 0,
        y: 0,
        z: 0,
    });
    const [subscription, setSubscription] = useState(null);

    const _subscribe = () => {
        Accelerometer.setUpdateInterval(1000);
        setSubscription(Accelerometer.addListener(setData));
    };

    const _unsubscribe = () => {
        subscription && subscription.remove();
        setSubscription(null);
    };

    useEffect(() => {
        _subscribe();
        if (timerStatus === TimerStatus.pause) {
            console.log(`${x}, ${y}, ${z}`);
        }
        return () => _unsubscribe();
    }, [timerStatus]);
};

export default SensorAccelerometer;