import { useTheme } from '@react-navigation/native';
import { Button } from '@rneui/base';
import { Accelerometer } from 'expo-sensors';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const SensorAccelerometer = () => {
    const [{ x, y, z }, setData] = useState({
        x: 0,
        y: 0,
        z: 0,
    });
    const [subscription, setSubscription] = useState(null);


    // Style variables
    const { colors, fontSizes } = useTheme();
    const styles = StyleSheet.create({
        text: {
            margin: 5,
            color: colors.text,
            textAlign: 'center'
        }
    });

    const _slow = () => Accelerometer.setUpdateInterval(1000);
    const _fast = () => Accelerometer.setUpdateInterval(16);

    const _subscribe = () => {
        setSubscription(Accelerometer.addListener(setData));
    };

    const _unsubscribe = () => {
        subscription && subscription.remove();
        setSubscription(null);
    };

    useEffect(() => {
        _subscribe();
        return () => _unsubscribe();
    }, []);

    return (
        <View>
            <Text style={styles.text}>Accelerometer: (in gs where 1g = 9.81 m/s^2)</Text>
            <Text style={styles.text}>x: {x}</Text>
            <Text style={styles.text}>y: {y}</Text>
            <Text style={styles.text}>z: {z}</Text>
            <View>
                <Button onPress={subscription ? _unsubscribe : _subscribe}> {subscription ? 'On' : 'Off'} </Button>
                <Button onPress={_slow}> Slow </Button>
                <Button onPress={_fast}> Fast </Button>
            </View>
        </View>
    );
};

export default SensorAccelerometer;