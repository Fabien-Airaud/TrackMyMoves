import { useFocusEffect, useTheme } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import ActivityList from './ActivityList';
import { getActivityTypes } from './HistoryFunctions';

const History = ({ navigation }) => {
    // State variables
    const [list, setList] = useState([]);

    // Style variables
    const { colors, fontSizes } = useTheme();
    const styles = StyleSheet.create({
        page: {
            minHeight: '100%',
            width: '100%',
            backgroundColor: colors.background
        },
        noActivityView: {
            alignItems: "center",
            marginVertical: "5%"
        },
        text: {
            textAlign: 'center',
            margin: 10,
            color: colors.text,
            fontSize: fontSizes.md
        }
    });

    // Logged account stored in redux
    const logAcc = useSelector((state) => state.logIn);

    useFocusEffect(
        useCallback(() => {
            let isSubscribed = true;

            // declare the async data fetching function
            const getData = async () => {
                // get the activity types
                const activityTypes = await getActivityTypes(logAcc.id);

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

    return (
        <ScrollView style={styles.page}>
            {(list.length === 0)
                ? <View style={styles.noActivityView}>
                    <Text style={styles.text}>You can go to move page to create your first activity</Text>
                    <Button title="Move page" onPress={() => navigation.navigate("Move")} size='lg' radius='sm' titleStyle={{ fontWeight: 'bold' }} color={colors.primary} containerStyle={{ margin: '5%', width: '30%' }} />
                </View>
                : <ActivityList list={list} navigation={navigation} />
            }
        </ScrollView>
    );
};

export default History;