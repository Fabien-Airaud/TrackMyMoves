import { useTheme } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';
import { useSelector } from 'react-redux';

import { formatTime } from '../move/FormatTime';

const ActivityIntervals = () => {
    // Activity infos stored in redux
    const intervals = useSelector((state) => state.apiActivityInfos.intervals);

    // State variables
    const [page, setPage] = useState(0);
    const numberOfItemsPerPageList = [5, 10];
    const [itemsPerPage, onItemsPerPageChange] = useState(numberOfItemsPerPageList[0]);
    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, intervals.length);

    // Style variables
    const { colors, fontSizes } = useTheme();
    const styles = StyleSheet.create({
        cell: {
            flexGrow: 0,
            flexShrink: 0
        },
        number: {
            width: 30
        },
        date: {
            width: 100
        },
        time: {
            width: 80
        }
    });

    useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);

    return (
        <ScrollView horizontal={true}>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title style={[styles.cell, styles.number]} textStyle={{color: colors.placeholder}}>#</DataTable.Title>
                    <DataTable.Title style={[styles.cell, styles.date]} textStyle={{color: colors.placeholder}}>Start date</DataTable.Title>
                    <DataTable.Title style={[styles.cell, styles.time]} textStyle={{color: colors.placeholder}}>Time</DataTable.Title>
                    <DataTable.Title style={[styles.cell, styles.time]} textStyle={{color: colors.placeholder}}>Total time</DataTable.Title>
                </DataTable.Header>

                {intervals.slice(from, to).map((interval, index) => {
                    // Get start date in string
                    const startDate = new Date(interval.start_datetime).toLocaleTimeString();

                    // Get times in string formatted
                    const time = formatTime(interval.end_time - interval.start_time, false);
                    const totalTime = formatTime(interval.end_time, false);

                    return (
                        <DataTable.Row key={index}>
                            <DataTable.Cell style={[styles.cell, styles.number]} textStyle={{color: colors.text}}>{index + from + 1}</DataTable.Cell>
                            <DataTable.Cell style={[styles.cell, styles.date]} textStyle={{color: colors.text}}>{startDate}</DataTable.Cell>
                            <DataTable.Cell style={[styles.cell, styles.time]} textStyle={{color: colors.text}}>{time}</DataTable.Cell>
                            <DataTable.Cell style={[styles.cell, styles.time]} textStyle={{color: colors.text}}>{totalTime}</DataTable.Cell>
                        </DataTable.Row>
                    );
                })}

                <DataTable.Pagination
                    page={page}
                    numberOfPages={Math.ceil(intervals.length / itemsPerPage)}
                    onPageChange={(page) => setPage(page)}
                    label={`${from + 1}-${to} of ${intervals.length}`}
                    numberOfItemsPerPageList={numberOfItemsPerPageList}
                    numberOfItemsPerPage={itemsPerPage}
                    onItemsPerPageChange={onItemsPerPageChange}
                    selectPageDropdownLabel={'Rows per page'}
                />
            </DataTable>
        </ScrollView>
    );
};

export default ActivityIntervals;