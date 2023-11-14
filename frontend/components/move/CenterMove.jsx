import { useTheme } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import { Alert, StyleSheet, Text, View } from "react-native";
import { IconButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import { createActivity, deleteActivity, stopActivity } from '../../redux/currentActivitySlice';
import { saveActivity } from './ActivityFilesFunctions';
import { MovePageType, TimerStatus } from './Move';

const CenterMove = ({ activityType, timerStatus, setTimerStatus, pageType, setPageType, resetActivity }) => {
    // Style variables
    const { colors, fontSizes } = useTheme();
    const styles = StyleSheet.create({
        section: {
            width: '90%',
            height: '40%',
            alignItems: 'center',
            justifyContent: 'center'
        },
        subsection: {
            height: '100%',
            width: '40%',
            marginHorizontal: '3%',
            alignItems: 'center',
            justifyContent: 'center'
        },
        textButton: {
            color: colors.text,
            fontSize: fontSizes.lg
        },
        text: {
            color: colors.text,
            fontSize: fontSizes.md,
            textAlign: 'center'
        },
        buttons: {
            width: '100%',
            padding: '5%',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center'
        }
    });

    // Logged account stored in redux
    const logAcc = useSelector((state) => state.logIn);
    // Current activity stored in redux
    const activity = useSelector((state) => state.currentActivity);

    const dispatch = useDispatch();

    // Create a new activity when start button pressed and change to stop move page
    const dispatchNewActivity = () => {
        const startDate = new Date();

        dispatch(
            createActivity({
                accountId: logAcc.id,
                activityType: activityType,
                startDate: startDate.toISOString()
            })
        );

        setTimerStatus(TimerStatus.play); // start the timer after activity created
        setPageType(MovePageType.stop);
    };

    // Change between pause and play
    const pausePlayActivity = () => {
        (timerStatus === TimerStatus.play) ? setTimerStatus(TimerStatus.pause) : setTimerStatus(TimerStatus.play);
    }

    // Change endDate of the current activity
    const dispatchStopActivity = () => {
        const endDate = new Date();
        setTimerStatus(TimerStatus.pause); // stop the timer before activity ended

        dispatch(
            stopActivity({ endDate: endDate.toISOString() })
        );

        setPageType(MovePageType.save);
    };

    // Delete the current activity and reset activity
    const dispatchDelActivity = () => {
        // Remove activity from current activity state
        dispatch(
            deleteActivity()
        );

        resetActivity();
        setTimerStatus(TimerStatus.reset);
    }

    // Create a new activity when start button pressed
    const dispatchSaveActivity = async () => {
        await saveActivity(activity).then(
            () => Alert.alert(
                'Activity saved',
                'Your current activity is saved'),
            () => alert('An error occured while saving the activity'));

        // Add activity to activities state
        dispatchDelActivity();
    };

    switch (pageType) {
        case MovePageType.start:
            return (
                <View style={styles.section}>
                    <IconButton disabled={activityType == undefined} onPress={dispatchNewActivity} icon='play-circle-outline' iconColor={colors.primary} size={fontSizes.bigButton} theme={{ colors: { onSurfaceDisabled: colors.placeholder } }} />
                    <Text style={styles.textButton}> Start </Text>
                </View>
            );

        case MovePageType.stop:
            return (
                <View style={[styles.section, { flexDirection: 'row' }]}>
                    <View style={styles.subsection}>
                        <IconButton onPress={pausePlayActivity} icon={(timerStatus === TimerStatus.play) ? 'pause-circle-outline' : 'play-circle-outline'} iconColor={colors.primary} size={fontSizes.bigButton} theme={{ colors: { onSurfaceDisabled: colors.placeholder } }} />
                        <Text style={styles.textButton}> {(timerStatus === TimerStatus.play) ? 'Pause' : 'Play'} </Text>
                    </View>
                    <View style={styles.subsection}>
                        <IconButton onPress={dispatchStopActivity} icon='stop-circle-outline' iconColor={colors.primary} size={fontSizes.bigButton} theme={{ colors: { onSurfaceDisabled: colors.placeholder } }} />
                        <Text style={styles.textButton}> Stop </Text>
                    </View>
                </View>
            );

        case MovePageType.save:
            return (
                <View style={styles.section}>
                    <Text style={styles.text}> Do you want to save or delete the activity ? </Text>
                    <View style={styles.buttons}>
                        <Button title='Save' onPress={dispatchSaveActivity} size='md' radius='sm' color={colors.primary} titleStyle={{ fontWeight: 'bold' }} containerStyle={{ width: '40%' }} />
                        <Button title='Delete' onPress={dispatchDelActivity} size='md' radius='sm' color={colors.error} titleStyle={{ fontWeight: 'bold' }} containerStyle={{ width: '40%' }} />
                    </View>
                </View>
            );

        default:
            break;
    };
};

export default CenterMove;