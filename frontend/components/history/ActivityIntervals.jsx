import { useTheme } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';

import { formatTime } from '../move/FormatTime';

const ActivityIntervals = ({ navigation, route: { params: { intervals } } }) => {
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
            width: 180
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
                    <DataTable.Title style={[styles.cell, styles.number]}>#</DataTable.Title>
                    <DataTable.Title style={[styles.cell, styles.date]}>Start date</DataTable.Title>
                    <DataTable.Title style={[styles.cell, styles.time]}>Time</DataTable.Title>
                    <DataTable.Title style={[styles.cell, styles.time]}>Total time</DataTable.Title>
                </DataTable.Header>

                {intervals.slice(from, to).map((interval, index) => {
                    // Get times in string formatted
                    const time = formatTime(interval.endTime - interval.startTime, false);
                    const totalTime = formatTime(interval.endTime, false);

                    // Get start date in string
                    const startDate = new Date(interval.startDate).toLocaleString();

                    return (
                        <DataTable.Row key={index}>
                            <DataTable.Cell style={[styles.cell, styles.number]}>{index + from + 1}</DataTable.Cell>
                            <DataTable.Cell style={[styles.cell, styles.date]}>{startDate}</DataTable.Cell>
                            <DataTable.Cell style={[styles.cell, styles.time]}>{time}</DataTable.Cell>
                            <DataTable.Cell style={[styles.cell, styles.time]}>{totalTime}</DataTable.Cell>
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
                    showFastPaginationControls
                    selectPageDropdownLabel={'Rows per page'}
                />
            </DataTable>
        </ScrollView>
    );
};

export default ActivityIntervals;