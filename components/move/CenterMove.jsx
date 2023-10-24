import { useTheme } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import { StyleSheet, Text, View } from "react-native";
import { IconButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import { createActivity, stopActivity, deleteActivity } from '../../redux/currentActivitySlice';
import { MovePageType } from './Move';
import { addActivity } from '../../redux/activitySlice';

const CenterMove = ({ activityType, pageType, setPageType, resetActivity }) => {
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
    const logAcc = useSelector((state) => state.logIn.account);
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
                startDate: startDate.toISOString(),
                endDate: ''
            })
        );

        setPageType(MovePageType.stop);
    };

    // Change endDate of the current activity
    const dispatchStopActivity = () => {
        const endDate = new Date();

        dispatch(
            stopActivity({ endDate: endDate.toISOString() })
        );

        setPageType(MovePageType.save);
    };

    // Create a new activity when start button pressed and change to stop move page
    const dispatchSaveActivity = () => {
        // Add activity to activities state
        dispatch(
            addActivity(activity)
        );
        
        // Remove activity from current activity state
        dispatch(
            deleteActivity()
        );

        resetActivity();
    };

    switch (pageType) {
        case MovePageType.start:
            return (
                <View style={styles.section}>
                    <IconButton disabled={activityType == undefined} onPress={dispatchNewActivity} icon='play-circle-outline' iconColor={colors.primary} size={fontSizes.bigButton} theme={{colors: {onSurfaceDisabled: colors.placeholder}}} />
                    <Text style={styles.textButton}> Start </Text>
                </View>
            );

        case MovePageType.stop:
            return (
                <View style={styles.section}>
                    <IconButton onPress={dispatchStopActivity} icon='stop-circle-outline' iconColor={colors.primary} size={fontSizes.bigButton} theme={{colors: {onSurfaceDisabled: colors.placeholder}}} />
                    <Text style={styles.textButton}> Stop </Text>
                </View>
            );

        case MovePageType.save:
            return (
                <View style={styles.section}>
                    <Text style={styles.text}> Do you want to save or delete the activity ? </Text>
                    <View style={styles.buttons}>
                        <Button title='Save' onPress={dispatchSaveActivity} size='md' radius='sm' color={colors.primary} titleStyle={{ fontWeight: 'bold' }} containerStyle={{width: '40%'}} />
                        <Button title='Delete' onPress={() => console.log('delete')} size='md' radius='sm' color={colors.error} titleStyle={{ fontWeight: 'bold' }} containerStyle={{width: '40%'}} />
                    </View>
                </View>
            );

        default:
            break;
    };
};

export default CenterMove;