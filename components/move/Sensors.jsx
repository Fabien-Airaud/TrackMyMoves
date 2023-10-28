import { Accelerometer, Gyroscope } from 'expo-sensors';
import { useEffect, useState } from 'react';

import { TimerStatus } from './Move';

const Sensors = ({ timerStatus, dispatchSensorsInter }) => {
    const [sensorsInter, setSensorsInter] = useState({
        startDate: '',
        accelerometer: [],
        gyroscope: []
    });
    
    Accelerometer.setUpdateInterval(1000);
    Gyroscope.setUpdateInterval(1000);

    // Add a data in accelerometer interval using the setter
    const addAccelData = (accelData) => {
        return setSensorsInter(prevData => ({
            ...prevData,
            accelerometer: prevData.accelerometer ? [...prevData.accelerometer, accelData] : []
        }))
    };

    // Add a data in gyroscope interval using the setter
    const addGyrosData = (gyrosData) => {
        return setSensorsInter(prevData => ({
            ...prevData,
            gyroscope: prevData.gyroscope ? [...prevData.gyroscope, gyrosData] : []
        }))
    };

    const subscribe = () => {
        Accelerometer.addListener(addAccelData);
        Gyroscope.addListener(addGyrosData);
    };

    const unsubscribe = () => {
        Accelerometer.removeAllListeners();
        Gyroscope.removeAllListeners();
    };

    // Subscribe and add start date in interval
    const startInterval = () => {
        subscribe();

        // Init sensors interval with start date
        const startDate = new Date();
        setSensorsInter({
            startDate: startDate.toISOString(),
            accelerometer: [],
            gyroscope: []
        });
    }

    // Send interval to the store and unsubscribe
    const endInterval = () => {
        console.log(sensorsInter);
        dispatchSensorsInter(sensorsInter);
        unsubscribe();
    }

    useEffect(() => {
        if (timerStatus === TimerStatus.play) startInterval(); // when play button pressed
        else if (timerStatus === TimerStatus.pause) endInterval(); // when pause or stop button pressed
    }, [timerStatus]);
};

export default Sensors;