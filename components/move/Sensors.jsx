import { Accelerometer, Gyroscope } from 'expo-sensors';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

import { TimerStatus } from './Move';
import { color } from '@rneui/base';

const Sensors = ({ timerStatus, dispatchSensorsInter }) => {
    const [sensorsInter, setSensorsInter] = useState({
        startDate: '',
        accelerometer: [],
        gyroscope: [],
        location: []
    });
    const [addLocation, setAddLocation] = useState(false);
    
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

    // Add a data in location interval using the setter
    const addLocationData = (position) => {
        return setSensorsInter(prevData => ({
            ...prevData,
            location: prevData.location ? [...prevData.location, position] : []
        }))
    };

    const subscribe = () => {
        Accelerometer.addListener(addAccelData);
        Gyroscope.addListener(addGyrosData);
        setAddLocation(true);
    };

    const unsubscribe = () => {
        Accelerometer.removeAllListeners();
        Gyroscope.removeAllListeners();
        setAddLocation(false);
    };

    // Subscribe and add start date in interval
    const startInterval = () => {
        subscribe();

        // Init sensors interval with start date
        const startDate = new Date();
        setSensorsInter({
            startDate: startDate.toISOString(),
            accelerometer: [],
            gyroscope: [],
            location: []
        });
    }

    // Send interval to the store and unsubscribe
    const endInterval = () => {
        console.log(sensorsInter);
        dispatchSensorsInter(sensorsInter);
        unsubscribe();
    }

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                alert("Permission to access location was denied");
                return;
            }
            await Location.getCurrentPositionAsync();

            let subscription;
            if (addLocation) {
                subscription = await Location.watchPositionAsync({
                    timeInterval: 1000,
                }, (position) => {
                    addLocationData(position);
                });
            } else if (addLocation && subscription) {
                console.log('subscription.remove()');
                subscription.remove();
            }
        })();
    }, [addLocation]);

    useEffect(() => {
        if (timerStatus === TimerStatus.play) startInterval(); // when play button pressed
        else if (timerStatus === TimerStatus.pause) endInterval(); // when pause or stop button pressed
    }, [timerStatus]);
};

export default Sensors;