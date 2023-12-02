import { useTheme } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import { Alert, StyleSheet, Text, View } from "react-native";
import { IconButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import { ActivityState, changeCurrentState, newActivity, stopActivity, deleteActivity } from '../../redux/apiActivitySlice';

const CenterMove = () => {
    // Logged account and current activity stored in redux
    const apiAccount = useSelector((state) => state.apiAccount);
    const apiActivity = useSelector((state) => state.apiActivity);

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


    const dispatch = useDispatch();

    // Create a new activity when start button pressed
    const dispatchNewActivity = () => {
        dispatch(newActivity({ userId: apiAccount.account.user.id }));
    };

    // Switch between paused and ongoing states
    const dispatchChangeCurrentState = () => {
        const newState = (apiActivity.currentState === ActivityState.ongoing) ? ActivityState.paused : ActivityState.ongoing;
        dispatch(changeCurrentState({ currentState: newState }));
    }

    // Stop activity when stop button pressed
    const dispatchStopActivity = () => {
        dispatch(stopActivity());
    };

    // Delete activity
    const dispatchDeleteActivity = () => {
        dispatch(deleteActivity());
    }

    // Create a new activity when start button pressed
    const dispatchSaveActivity = async () => {
        await saveActivity(activity).then(
            () => Alert.alert(
                'Activity saved',
                'Your current activity is saved'),
            () => alert('An error occured while saving the activity'));

        // Delete activity in redux store
        dispatchDeleteActivity();
    };

    switch (apiActivity.currentState) {
        case ActivityState.starting:
            return (
                <View style={styles.section}>
                    <IconButton disabled={apiActivity.activityType == undefined} onPress={dispatchNewActivity} icon='play-circle-outline' iconColor={colors.primary} size={fontSizes.bigButton} theme={{ colors: { onSurfaceDisabled: colors.placeholder } }} />
                    <Text style={styles.textButton}> Start </Text>
                </View>
            );

        case ActivityState.stopped:
            return (
                <View style={styles.section}>
                    <Text style={styles.text}> Do you want to save or delete the activity ? </Text>
                    <View style={styles.buttons}>
                        <Button title='Save' onPress={dispatchSaveActivity} size='md' radius='sm' color={colors.primary} titleStyle={{ fontWeight: 'bold' }} containerStyle={{ width: '40%' }} />
                        <Button title='Delete' onPress={dispatchDeleteActivity} size='md' radius='sm' color={colors.error} titleStyle={{ fontWeight: 'bold' }} containerStyle={{ width: '40%' }} />
                    </View>
                </View>
            );

        default:
            return (
                <View style={[styles.section, { flexDirection: 'row' }]}>
                    <View style={styles.subsection}>
                        <IconButton onPress={dispatchChangeCurrentState} icon={(apiActivity.currentState === ActivityState.ongoing) ? 'pause-circle-outline' : 'play-circle-outline'} iconColor={colors.primary} size={fontSizes.bigButton} theme={{ colors: { onSurfaceDisabled: colors.placeholder } }} />
                        <Text style={styles.textButton}> {(apiActivity.currentState === ActivityState.ongoing) ? 'Pause' : 'Play'} </Text>
                    </View>
                    <View style={styles.subsection}>
                        <IconButton onPress={dispatchStopActivity} icon='stop-circle-outline' iconColor={colors.primary} size={fontSizes.bigButton} theme={{ colors: { onSurfaceDisabled: colors.placeholder } }} />
                        <Text style={styles.textButton}> Stop </Text>
                    </View>
                </View>
            );
    };
};

export default CenterMove;