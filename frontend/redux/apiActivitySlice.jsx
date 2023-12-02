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
        current_state: ActivityState.starting
    },
    reducers: {
        changeActivityType: (state, action) => {
            state.activity_type = action.payload.activityType;
            console.log("Change activityType: " + JSON.stringify(state));
        },
        newActivity: (state, action) => {
            const start = new Date().toISOString();
            const interval = {
                start_datetime: start
            }

            state.current_state = ActivityState.ongoing;
            state.user = action.payload.userId;
            state.start_datetime = start;
            state.intervals = [interval];
            console.log("New activity: " + JSON.stringify(state));
        },
        changeCurrentState: (state, action) => {
            state.current_state = action.payload.currentState;
            console.log("Change current state: " + JSON.stringify(state));
        },
        stopActivity: (state) => {
            state.current_state = ActivityState.stopped;
            state.end_datetime = new Date().toISOString();
            console.log("Stop activity: " + JSON.stringify(state));
        },
        deleteActivity: () => {
            console.log("Delete activity");
            return {
                current_state: ActivityState.starting
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