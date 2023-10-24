import { useTheme } from '@react-navigation/native';
import { StyleSheet, Text, View } from "react-native";
import { IconButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { v4 } from 'uuid';

import { createActivity } from '../../redux/activitySlice';

const CenterMove = ({ activityType }) => {
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

    // Dispatch the account to log in
    const dispatchNewActivity = () => {
        const startDate = new Date();
        dispatch(
            createActivity({
                id: v4(),
                accountId: logAcc.id,
                activityType: activityType,
                startDate: startDate.toISOString()
            })
        );
    };

    return (
        <View style={styles.section}>
            <IconButton disabled={activityType == ''} onPress={dispatchNewActivity} icon='play-circle-outline' iconColor={colors.primary} size={fontSizes.bigButton} />
            <Text style={styles.textButton}> Start </Text>
        </View>
    );
};

export default CenterMove;