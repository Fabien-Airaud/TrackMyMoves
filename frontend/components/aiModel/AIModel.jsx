import { useTheme } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSelector } from 'react-redux';

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
            paddingHorizontal: 10
        },
        buttons: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingVertical: 10
        },
        button: {
            minWidth: 110,
            margin: 10
        },
        text: {
            color: colors.text,
            fontSize: fontSizes.md,
            marginBottom: 15
        }
    });


    const getModelResults = () => {
        retrieveModelTestsResultsAPI(apiAccount.token, apiAccount.account.id)
            .then(response => {
                if (response) setModelResult(response);
                else alert("Results error", "Can't get model results from server");
            })
            .catch(console.error);
    };

    return (
        <ScrollView style={styles.page}>
            <View style={styles.buttons}>
                <Button title='Train model' onPress={() => { }} size='md' radius='sm' buttonStyle={styles.button} />
                <Button title='Test model' onPress={() => { }} size='md' radius='sm' buttonStyle={styles.button} />
            </View>
            <Text style={styles.text}>Accuracy : {modelResult ? modelResult.accuracy : "None"}</Text>
            <Button title='Get model results' onPress={getModelResults} size='md' radius='sm' />
        </ScrollView>
    );
};

export default AIModel;