import { useState } from 'react';
import { StyleSheet, View } from "react-native";

import BottomMove from './BottomMove';
import CenterMove from './CenterMove';
import TopMove from './TopMove';

// Type of move page to display
export const MovePageType = Object.freeze({
    start: 1,
    stop: 2,
    save: 3
});

const Move = () => {
    // State variables
    const [activityType, setActivityType] = useState(undefined);
    const [pageType, setPageType] = useState(MovePageType.start);

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
            <TopMove activityType={activityType} setActivityType={setActivityType} pageType={pageType} />
            <CenterMove activityType={activityType?.value} pageType={pageType} setPageType={setPageType} />
            <BottomMove pageType={pageType} />
        </View>
    );
};

export default Move;