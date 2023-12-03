import { StyleSheet, View } from "react-native";

import BottomMove from './BottomMove';
import CenterMove from './CenterMove';
import Sensors from './Sensors';
import TopMove from './TopMove';

const Move = () => {
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
            <Sensors />
            <TopMove />
            <CenterMove />
            <BottomMove />
        </View>
    );
};

export default Move;