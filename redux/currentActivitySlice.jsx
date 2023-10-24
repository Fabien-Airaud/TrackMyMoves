import { createSlice } from '@reduxjs/toolkit';
import { v4 } from 'uuid';

export const currentActivitySlice = createSlice({
    name: 'currentActivity',
    initialState: {},
    reducers: {
        createActivity: (state, action) => {
            return {
                id: v4(),
                accountId: action.payload.accountId,
                type: action.payload.activityType,
                startDate: action.payload.startDate,
                endDate: ''
            };
        },
        stopActivity: (state, action) => {
            state.endDate = action.payload.endDate;
        }
    }
});


export const {
    createActivity,
    stopActivity
} = currentActivitySlice.actions;

export default currentActivitySlice.reducer;