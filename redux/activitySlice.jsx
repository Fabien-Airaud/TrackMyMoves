import { createSlice } from '@reduxjs/toolkit';

export const activitySlice = createSlice({
    name: 'activities',
    initialState: [],
    reducers: {
        createActivity: (state, action) => {
            const activity = {
                id: action.payload.id,
                type: action.payload.activityType,
                startDate: action.payload.startDate,
                endDate: ''
            };
            state.push(activity);
        }
    }
});


export const {
    createActivity
} = activitySlice.actions;

export default activitySlice.reducer;