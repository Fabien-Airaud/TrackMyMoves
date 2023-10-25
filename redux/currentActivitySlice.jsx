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
        pauseInterval: (state, action) => {
            let lastInterval = state.intervals.pop(); // Remove last interval pushed

            if (lastInterval) { // If last interval is defined
                lastInterval.endDate = action.payload.endDateInterval;
                lastInterval.endTime = action.payload.endTimeInterval;
                state.intervals.push(lastInterval); // Push interval with endDate and endTime added
            }
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
    pauseInterval,
    stopActivity,
    deleteActivity
} = currentActivitySlice.actions;

export default currentActivitySlice.reducer;