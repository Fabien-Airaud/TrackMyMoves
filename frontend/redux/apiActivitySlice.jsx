import { createSlice } from '@reduxjs/toolkit';

// Possible states for the activity
export const ActivityState = Object.freeze({
    starting: 1,
    ongoing: 2,
    stopped: 3
});

export const apiActivitySlice = createSlice({
    name: 'apiActivity',
    initialState: {
        currentState: ActivityState.starting
    },
    reducers: {
        changeActivityType: (state, action) => {
            state.activityType = action.payload.activityType;
            console.log("Change activityType: " + JSON.stringify(state));
        },
        newActivity: (state, action) => {
            state.currentState = ActivityState.ongoing;
            state.userId = action.payload.userId;
            state.startDate = new Date().toISOString();
            console.log("New activity: " + JSON.stringify(state));
        }
    }
});


export const {
    changeActivityType,
    newActivity
} = apiActivitySlice.actions;

export default apiActivitySlice.reducer;