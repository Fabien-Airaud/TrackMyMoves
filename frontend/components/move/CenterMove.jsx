import { useTheme } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import { Alert, StyleSheet, Text, View } from "react-native";
import { IconButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import { ActivityState, playActivity, pauseActivity, newActivity, stopActivity, deleteActivity } from '../../redux/apiActivitySlice';
import { createActivityAPI, guessActivityTypeAIAPI } from '../APIFunctions';

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
    const dispatchPlayPauseActivity = () => {
        (apiActivity.current_state === ActivityState.ongoing)
        ? dispatch(pauseActivity()) // is ongoing -> pause
        : dispatch(playActivity()); // is pause -> play
    }

    // Stop activity when stop button pressed
    const dispatchStopActivity = () => {
        dispatch(stopActivity());
    };

    // Delete activity
    const dispatchDeleteActivity = () => {
        Alert.alert(
            'Delete activity',
            'Are you sure you want to delete the activity?',
            [
                { text: 'Delete', onPress: () => dispatch(deleteActivity()) },
                { text: 'Cancel' }
            ],
            { cancelable: true }
        );
    }

    const guessActivityTypeAI = async (activity_id) => {
        guessActivityTypeAIAPI(apiAccount.token, apiAccount.account.user.id, activity_id)
            .then(response => {
                Alert.alert(
                    "Guess " + (response.result ? "done" : "failed"),
                    "The AI model found the activity should be '" + response.message.activity_type.label
                    + "', being at " + response.message.rate + "% certain.\n And "
                    + (response.message.accuracy * 100) + "% of the results were right.");
            })
            .catch(console.error);
    };

    // Create a new activity when start button pressed
    const dispatchSaveActivity = () => {
        createActivityAPI(apiAccount.token, apiActivity)
            .then(response => {
                if (response.result) {
                    Alert.alert(
                        'Activity saved',
                        'Your current activity is saved, do you want to ask the AI model to guess the type of activity ?',
                        [
                            {
                                text: "Ask AI",
                                onPress: () => guessActivityTypeAI(response.activity.id)
                            },
                            {
                                text: "Don't ask",
                                onPress: () => console.log("Don't ask")
                            }
                        ]);

                    // Delete activity in redux store
                    dispatch(deleteActivity());
                }
                else alert(JSON.stringify(response.helpers));
            })
            .catch(console.error);
    };

    switch (apiActivity.current_state) {
        case ActivityState.starting:
            return (
                <View style={styles.section}>
                    <IconButton disabled={apiActivity.activity_type == undefined} onPress={dispatchNewActivity} icon='play-circle-outline' iconColor={colors.primary} size={fontSizes.bigButton} theme={{ colors: { onSurfaceDisabled: colors.placeholder } }} />
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
                        <IconButton onPress={dispatchPlayPauseActivity} icon={(apiActivity.current_state === ActivityState.ongoing) ? 'pause-circle-outline' : 'play-circle-outline'} iconColor={colors.primary} size={fontSizes.bigButton} theme={{ colors: { onSurfaceDisabled: colors.placeholder } }} />
                        <Text style={styles.textButton}> {(apiActivity.current_state === ActivityState.ongoing) ? 'Pause' : 'Play'} </Text>
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