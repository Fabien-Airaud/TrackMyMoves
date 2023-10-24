import { useState } from 'react';
import { StyleSheet, View } from "react-native";

import BottomMove from './BottomMove';
import CenterMove from './CenterMove';
import TopMove from './TopMove';

const Move = () => {
    // State variables
    const [activityType, setActivityType] = useState(undefined);

    // Style variables
    const styles = StyleSheet.create({
        page: {
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center'
        }
    });

    return (
        <View style={styles.page}>
            <TopMove activityType={activityType} setActivityType={setActivityType} />
            <CenterMove activityType={activityType?.value} />
            <BottomMove />
        </View>
    );
};

export default Move;