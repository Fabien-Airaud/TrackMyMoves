import { Accelerometer, Gyroscope } from 'expo-sensors';
import { useEffect, useState } from 'react';
// import * as Location from 'expo-location';
import { useDispatch, useSelector } from 'react-redux';

import { ActivityState, addSensorsInterval } from '../../redux/apiActivitySlice';

const SENSORS_TIME_INTERVAL = 100;

const Sensors = () => {
    // Current activity stored in redux
    const apiActivity = useSelector((state) => state.apiActivity);

    // State variables
    const [paused, setPaused] = useState(false);
    const [accelIntervals, setAccelIntervals] = useState([]);
    const [gyrosIntervals, setGyrosIntervals] = useState([]);

    Accelerometer.setUpdateInterval(SENSORS_TIME_INTERVAL);
    Gyroscope.setUpdateInterval(SENSORS_TIME_INTERVAL);


    const dispatch = useDispatch();

    // Add accelerometer data in sensors interval using the setter
    const addAccelData = (accelData) => {
        let accelInter = accelIntervals;
        accelInter.push({
            accel_x: accelData.x,
            accel_y: accelData.y,
            accel_z: accelData.z
        });
        setAccelIntervals(accelInter);
    };

    // Add hyroscope data in sensors interval using the setter
    const addGyrosData = (gyrosData) => {
        let gyrosInter = gyrosIntervals;
        gyrosInter.push({
            gyros_x: gyrosData.x,
            gyros_y: gyrosData.y,
            gyros_z: gyrosData.z
        });
        setGyrosIntervals(gyrosInter);
    };

    // Add a data in location interval using the setter
    // const addLocationData = (position) => {
    //     return setSensorsInter(prevData => ({
    //         ...prevData,
    //         location: prevData.location ? [...prevData.location, position] : []
    //     }))
    // };

    const subscribe = () => {
        Accelerometer.addListener(addAccelData);
        Gyroscope.addListener(addGyrosData);
        // setAddLocation(true);
    };

    const unsubscribe = () => {
        Accelerometer.removeAllListeners();
        Gyroscope.removeAllListeners();
        // setAddLocation(false);
    };

    // Subscribe and create sensors interval
    const playInterval = () => {
        setPaused(false);
        subscribe();
    }

    const dispatchAddSensorsInterval = () => {
        let sensorsIntervals = [];

        for (let i=0; i<accelIntervals.length && i<gyrosIntervals.length; i++) {
            sensorsIntervals.push({
                time: (i+1) * SENSORS_TIME_INTERVAL,
                ...accelIntervals[i],
                ...gyrosIntervals[i]
            });
        }

        dispatch(addSensorsInterval({ sensorsIntervals: sensorsIntervals }));
    }

    // Send interval to the store and unsubscribe
    const pauseInterval = () => {
        dispatchAddSensorsInterval();
        unsubscribe();
        setPaused(true);
        setAccelIntervals([]);
        setGyrosIntervals([]);
    }

    // useEffect(() => {
    //     (async () => {
    //         let { granted } = await Location.requestForegroundPermissionsAsync();
    //         if (!granted) {
    //             alert('Permission to access location was denied');
    //             return;
    //         }

    //         let subscription;
    //         if (addLocation) {
    //             subscription = await Location.watchPositionAsync({
    //                 timeInterval: 100
    //             }, (position) => {
    //                 addLocationData(position);
    //             });
    //         } else if (addLocation && subscription) {
    //             subscription.remove();
    //         }
    //     })();
    // }, [addLocation]);

    useEffect(() => {
        if (apiActivity.current_state === ActivityState.ongoing) playInterval(); // when play button pressed
        else if (apiActivity.current_state === ActivityState.paused || apiActivity.current_state === ActivityState.stopped) {// when pause or stop button pressed
            if (!paused) pauseInterval(); // If not already sent
        }
    }, [apiActivity.current_state]);
};

export default Sensors;