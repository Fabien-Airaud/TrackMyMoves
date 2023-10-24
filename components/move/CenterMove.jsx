import { useTheme } from '@react-navigation/native';
import { StyleSheet, Text, View } from "react-native";
import 'react-native-get-random-values';
import { IconButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { v4 } from 'uuid';

import { createActivity } from '../../redux/activitySlice';
import { MovePageType } from './Move';

const CenterMove = ({ activityType, pageType, setPageType }) => {
    // Current activity
    let activity = undefined;

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

    // const dispatch = useDispatch();

    // Create a new activity when start button pressed and change to stop move page
    const startActivity = () => {
        activity = {
            id: v4(),
            accountId: logAcc.id,
            type: activityType,
            startDate: new Date(),
            endDate: undefined 
        }

        setPageType(MovePageType.stop);
    };

    switch (pageType) {
        case MovePageType.start:
            return (
                <View style={styles.section}>
                    <IconButton disabled={activityType == undefined} onPress={startActivity} icon='play-circle-outline' iconColor={colors.primary} size={fontSizes.bigButton} />
                    <Text style={styles.textButton}> Start </Text>
                </View>
            );

        case MovePageType.stop:
            return (
                <View style={styles.section}>
                    <IconButton icon='stop-circle-outline' iconColor={colors.primary} size={fontSizes.bigButton} />
                    <Text style={styles.textButton}> Stop </Text>
                </View>
            );

        default:
            break;
    };
};

export default CenterMove;