import { useTheme } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { DataTable } from 'react-native-paper';
import { useSelector } from 'react-redux';

import { testAIModelAPI, trainAIModelAPI } from '../APIFunctions';

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

    const trainAIModel = () => {
        trainAIModelAPI(apiAccount.token, apiAccount.account.user.id)
            .then(response => {
                alert(
                    "Training " + (response.result ? "successful" : "failed"),
                    response.message);
            })
            .catch(console.error);
    };

    const changeReport = (report, caption) => {
        let newReport = {}

        for (const key in report) {
            if (key == "accuracy") break;
            newReport[caption[key]] = report[key]; // Replace id by label for each activityType
        }

        newReport["accuracy"] = { "precision": report.accuracy, "recall": report.accuracy, "f1-score": report.accuracy, "support": report.accuracy };
        newReport["macro avg"] = report["macro avg"]
        newReport["weighted avg"] = report["weighted avg"]
        return newReport;
    }

    const testAIModel = () => {
        testAIModelAPI(apiAccount.token, apiAccount.account.user.id)
            .then(response => {
                if (response.result) {
                    response.data.report = changeReport(response.data.report, response.data.caption);
                    setModelResults(response.data);
                    console.log(JSON.stringify(response.data));
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
                    <Text style={[styles.text, { marginBottom: -10 }]}>Report :</Text>
                    <DataTable style={styles.datatable}>
                        <DataTable.Header>
                            <DataTable.Title style={styles.labelColumn} textStyle={{ color: colors.placeholder }}></DataTable.Title>
                            <DataTable.Title style={styles.numericColumn} textStyle={{ color: colors.placeholder }} numeric>precision</DataTable.Title>
                            <DataTable.Title style={styles.numericColumn} textStyle={{ color: colors.placeholder }} numeric>recall</DataTable.Title>
                            <DataTable.Title style={styles.numericColumn} textStyle={{ color: colors.placeholder }} numeric>f1-score</DataTable.Title>
                            <DataTable.Title style={styles.numericColumn} textStyle={{ color: colors.placeholder }} numeric>support</DataTable.Title>
                        </DataTable.Header>

                        {Object.entries(modelResults.report).map((rowData, index) => (
                            <DataTable.Row key={index.toString()}>
                                <DataTable.Cell style={styles.labelColumn} textStyle={{ color: colors.text }}>{rowData[0]}</DataTable.Cell>
                                <DataTable.Cell style={styles.numericColumn} textStyle={{ color: colors.text }} numeric>{rowData[1]["precision"]}</DataTable.Cell>
                                <DataTable.Cell style={styles.numericColumn} textStyle={{ color: colors.text }} numeric>{rowData[1]["recall"]}</DataTable.Cell>
                                <DataTable.Cell style={styles.numericColumn} textStyle={{ color: colors.text }} numeric>{rowData[1]["f1-score"]}</DataTable.Cell>
                                <DataTable.Cell style={styles.numericColumn} textStyle={{ color: colors.text }} numeric>{rowData[1]["support"]}</DataTable.Cell>
                            </DataTable.Row>
                        ))}
                    </DataTable>
                    <Text style={styles.text}>Matrix : {JSON.stringify(modelResults.matrix)}</Text>
                    <Text style={styles.text}>Caption : {JSON.stringify(modelResults.caption)}</Text>
                </View>
            }
        </ScrollView>
    );
};

export default AIModel;