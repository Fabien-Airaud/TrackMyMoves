import { useTheme } from '@react-navigation/native';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const SensorLocation = () => {
    const [status, requestPermission] = Location.useForegroundPermissions();
    const [location, setLocation] = useState(null);

    // Style variables
    const { colors, fontSizes } = useTheme();
    const styles = StyleSheet.create({
        text: {
            margin: 5,
            color: colors.text,
            textAlign: 'center'
        }
    });

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                alert("Permission to access location was denied");
                return;
            }

            await Location.watchPositionAsync({
                timeInterval: 1000,
            }, (position) => {
                setLocation(position.coords);
                console.log(position.coords);
            });
        })();
    }, []);

    return (
        <View>
            <Text style={styles.text}>{location ? JSON.stringify(location) : 'no location'}</Text>
        </View>
    );
};

export default SensorLocation;