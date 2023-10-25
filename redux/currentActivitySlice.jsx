import { createSlice } from '@reduxjs/toolkit';
import 'react-native-get-random-values';
import { v4 } from 'uuid';

export const currentActivitySlice = createSlice({
    name: 'currentActivity',
    initialState: {},
    reducers: {
        createActivity: (state, action) => {
            return {
                id: v4(),
                accountId: action.payload.accountId,
                activityType: action.payload.activityType,
                startDate: action.payload.startDate,
                intervals: [],
                endDate: ''
            };
        },
        playInterval: (state, action) => {
            state.intervals.push({
                startDate: action.payload.startDateInterval,
                startTime: action.payload.startTimeInterval,
                endDate: '',
                endTime: ''
            })
        },
        stopActivity: (state, action) => {
            state.endDate = action.payload.endDate;
        },
        deleteActivity: () => {
            return {};
        }
    }
});


export const {
    createActivity,
    playInterval,
    stopActivity,
    deleteActivity
} = currentActivitySlice.actions;

export default currentActivitySlice.reducer;