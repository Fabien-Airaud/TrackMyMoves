import { createSlice } from '@reduxjs/toolkit';

export const activitySlice = createSlice({
    name: 'activities',
    initialState: [],
    reducers: {
        addActivity: (state, action) => {
            state.push(action.payload);
        }
    }
});


export const {
    addActivity
} = activitySlice.actions;

export default activitySlice.reducer;