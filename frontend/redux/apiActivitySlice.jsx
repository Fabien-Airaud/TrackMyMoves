import { createSlice } from '@reduxjs/toolkit';

// Possible states for the activity
export const ActivityState = Object.freeze({
    starting: 1,
    ongoing: 2,
    paused: 3,
    stopped: 4
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
            state.startDatetime = new Date().toISOString();
            console.log("New activity: " + JSON.stringify(state));
        },
        changeCurrentState: (state, action) => {
            state.currentState = action.payload.currentState;
            console.log("Change current state: " + JSON.stringify(state));
        },
        stopActivity: (state) => {
            state.currentState = ActivityState.stopped;
            state.endDatetime = new Date().toISOString();
            console.log("Stop activity: " + JSON.stringify(state));
        },
        deleteActivity: () => {
            console.log("Delete activity");
            return {
                currentState: ActivityState.starting
            };
        }
    }
});


export const {
    changeActivityType,
    newActivity,
    changeCurrentState,
    stopActivity,
    deleteActivity
} = apiActivitySlice.actions;

export default apiActivitySlice.reducer;