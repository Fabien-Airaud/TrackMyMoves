import { useFocusEffect, useTheme } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useSelector } from 'react-redux';

import Dropdown from '../Dropdown';
import ActivityTypes from './ActivityTypes';
import { MovePageType } from './Move';
import { listActivityTypeAPI } from '../APIFunctions';

const TopMove = ({ activityType, setActivityType, pageType }) => {
    // Logged account stored in redux
    const apiAccount = useSelector((state) => state.apiAccount);

    // State variables
    const [list, setList] = useState([]);

    // Style variables
    const { colors, fontSizes } = useTheme();
    const styles = StyleSheet.create({
        section: {
            width: '80%',
            height: '30%',
            alignItems: 'center',
            justifyContent: 'center'
        },
        warningText: {
            color: colors.error,
            textAlign: 'center'
        },
        container: {
            marginTop: 10
        },
        activityText: {
            color: colors.text,
            fontSize: fontSizes.md,
            textAlign: 'center'
        }
    });

    useFocusEffect(
        useCallback(() => {
            let isSubscribed = true;

            // declare the async data fetching function
            const getData = async () => {
                // get the activity types
                const activityTypes = await listActivityTypeAPI(apiAccount.token);

                // set state with the result if `isSubscribed` is true
                if (isSubscribed) {
                    setList(activityTypes);
                }
            }

            getData().catch(console.error); // make sure to catch any error

            // cancel any future `setData`
            return () => isSubscribed = false;
        }, [])
    );

    if (pageType === MovePageType.start) {
        return (
            <View style={styles.section}>
                <Text style={styles.warningText}> Please note, the type of activity can no longer be modified after the activity has started </Text>
                <Dropdown items={list} value={activityType} setValue={setActivityType} leadingIcon={true} width={120} containerStyle={styles.container} />
            </View>
        );
    } else {
        return (
            <View style={styles.section}>
                <IconButton icon={activityType.leadingIcon} iconColor={colors.text} size={fontSizes.medButton} />
                <Text style={styles.activityText}> {activityType.label} </Text>
            </View>
        );
    };
};

export default TopMove;