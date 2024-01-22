import { useTheme } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSelector } from 'react-redux';
import { DataTable } from 'react-native-paper';

import { retrieveModelTestsResultsAPI, testAIModelAPI, trainAIModelAPI } from '../APIFunctions';

const AIModel = () => {
    // State variables
    const [modelResults, setModelResults] = useState(undefined);

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
        results: {
            marginTop: 15,
            paddingHorizontal: 5
        },
        datatable: {
            marginTop: 0,
            marginBottom: 15
        },
        labelColumn: {
            flexGrow: 1,
            flexShrink: 0,
            flexBasis: 80
        },
        numericColumn: {
            flexGrow: 1,
            flexShrink: 0,
            flexBasis: 50
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


    // const getModelResults = () => {
    //     retrieveModelTestsResultsAPI(apiAccount.token)
    //         .then(response => {
    //             if (response) setModelResults(response);
    //             else Alert.alert(
    //                 "Results error",
    //                 "Can't get model results from server");
    //         })
    //         .catch(console.error);
    // };

    const trainAIModel = () => {
        trainAIModelAPI(apiAccount.token, apiAccount.account.user.id)
            .then(response => {
                alert(
                    "Training " + (response.result ? "successful" : "failed"),
                    response.message);
            })
            .catch(console.error);
    };

    const testAIModel = () => {
        testAIModelAPI(apiAccount.token, apiAccount.account.user.id)
            .then(response => {
                if (response.result) {
                    setModelResults(response.data);
                    console.log(JSON.stringify(modelResults))
                }
                else alert("Test failed", response.message);
            })
            .catch(console.error);
    };

    return (
        <ScrollView style={styles.page}>
            <Text style={{ color: colors.text, fontSize: fontSizes.md, marginTop: 15, textAlign: 'center' }}>
                To improve the capabilities of the model, you should perform several activites and train the model several times
            </Text>
            <View style={styles.buttons}>
                <Button title='Train model' onPress={trainAIModel} size='md' radius='sm' buttonStyle={styles.button} />
                <Button title='Test model' onPress={testAIModel} size='md' radius='sm' buttonStyle={styles.button} />
            </View>
            {modelResults &&
                <View style={styles.results}>
                    <Text style={styles.text}>Accuracy : {modelResults.accuracy * 100}%</Text>
                    <Text style={styles.text}>Report : {JSON.stringify(modelResults.report)}</Text>
                    <Text style={styles.text}>Matrix : {JSON.stringify(modelResults.matrix)}</Text>
                    <Text style={styles.text}>Caption : {JSON.stringify(modelResults.caption)}</Text>
                </View>
            }
        </ScrollView>
    );
};

export default AIModel;