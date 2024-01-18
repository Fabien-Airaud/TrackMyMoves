import { useTheme } from '@react-navigation/native';
import { useState } from 'react';
import { Button } from '@rneui/themed';
import { StyleSheet, View, Text } from "react-native";
import { useDispatch, useSelector } from 'react-redux';

import { retrieveModelTestsResultsAPI } from '../APIFunctions';

const AIModel = () => {
    // State variables
    const [modelResult, setModelResult] = useState(undefined);

    // Logged account stored in redux
    const apiAccount = useSelector((state) => state.apiAccount);

    // Style variables
    const { colors, fontSizes } = useTheme();
    const styles = StyleSheet.create({
        page: {
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center'
        },
        text: {
            color: colors.text
        }
    });


    const dispatch = useDispatch();

    // Create a new activity when start button pressed
    const dispatchGetResults = () => {
        retrieveModelTestsResultsAPI(apiAccount.token, apiAccount.account.id)
            .then(response => {
                if (response) setModelResult(response);
                else alert("Results error", "Can't get model results from server");
            })
            .catch(console.error);
    };

    return (
        <View style={styles.page}>
            <Text style={styles.text}>Accuracy : {modelResult ? modelResult.accuracy : "None"}</Text>
            <Button title='Get model results' onPress={dispatchGetResults} size='md' radius='sm' />
        </View>
    );
};

export default AIModel;