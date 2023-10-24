import { useTheme } from '@react-navigation/native';
import { StyleSheet, Text, View } from "react-native";
import 'react-native-get-random-values';
import { IconButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { v4 } from 'uuid';

import { createActivity } from '../../redux/currentActivitySlice';
import { MovePageType } from './Move';

const CenterMove = ({ activityType, pageType, setPageType }) => {
    // Style variables
    const { colors, fontSizes } = useTheme();
    const styles = StyleSheet.create({
        section: {
            width: '80%',
            height: '40%',
            alignItems: 'center',
            justifyContent: 'center'
        },
        textButton: {
            color: colors.text,
            fontSize: fontSizes.lg
        }
    });

    // Logged account stored in redux
    const logAcc = useSelector((state) => state.logIn.account);

    const dispatch = useDispatch();

    // Create a new activity when start button pressed and change to stop move page
    const dispatchNewActivity = () => {
        const startDate = new Date();

        dispatch(
            createActivity({
                id: v4(),
                accountId: logAcc.id,
                type: activityType,
                startDate: startDate.toISOString(),
                endDate: ''
            })
        );

        setPageType(MovePageType.stop);
    };

    // Change endDate of the current activity
    const stopActivity = () => {
        activity.endDate = new Date();
        console.log(activity);
        // setPageType(MovePageType.save);
    };

    switch (pageType) {
        case MovePageType.start:
            return (
                <View style={styles.section}>
                    <IconButton disabled={activityType == undefined} onPress={dispatchNewActivity} icon='play-circle-outline' iconColor={colors.primary} size={fontSizes.bigButton} />
                    <Text style={styles.textButton}> Start </Text>
                </View>
            );

        case MovePageType.stop:
            return (
                <View style={styles.section}>
                    <IconButton onPress={stopActivity} icon='stop-circle-outline' iconColor={colors.primary} size={fontSizes.bigButton} />
                    <Text style={styles.textButton}> Stop </Text>
                </View>
            );

        default:
            break;
    };
};

export default CenterMove;