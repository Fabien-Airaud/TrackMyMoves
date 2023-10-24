import { createSlice } from '@reduxjs/toolkit';

export const currentActivitySlice = createSlice({
    name: 'currentActivity',
    initialState: {},
    reducers: {
        createActivity: (state, action) => {
            return {
                id: action.payload.id,
                accountId: action.payload.accountId,
                type: action.payload.activityType,
                startDate: action.payload.startDate,
                endDate: ''
            };
        }
    }
});


export const {
    createActivity
} = currentActivitySlice.actions;

export default currentActivitySlice.reducer;