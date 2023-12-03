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
                start_datetime: start,
                sensors_intervals: []
            };

            state.current_state = ActivityState.ongoing;
            state.user = action.payload.userId;
            state.start_datetime = start;
            state.intervals = [interval];
            console.log("New activity: " + JSON.stringify(state));
        },
        playActivity: (state) => {
            const interval = {
                start_datetime: new Date().toISOString(),
                sensors_intervals: []
            };

            state.current_state = ActivityState.ongoing;
            state.intervals.push(interval);
            console.log("Play activity: " + JSON.stringify(state.intervals));
        },
        pauseActivity: (state) => {
            const interval = state.intervals.pop();
            interval.end_datetime = new Date().toISOString();

            state.current_state = ActivityState.paused;
            state.intervals.push(interval);
            console.log("Pause activity: " + JSON.stringify(state.intervals));
        },
        stopActivity: (state) => {
            const end = new Date().toISOString();
            const interval = state.intervals.pop();
            if (interval.end_datetime == undefined) interval.end_datetime = end;

            state.current_state = ActivityState.stopped;
            state.intervals.push(interval);
            state.end_datetime = end;
            console.log("Stop activity: " + JSON.stringify(state));
        },
        deleteActivity: () => {
            console.log("Delete activity");
            return {
                current_state: ActivityState.starting
            };
        },
        playTimerInterval: (state, action) => {
            const interval = state.intervals.pop();
            interval.start_time = action.payload.playTime;
        
            state.intervals.push(interval);
            console.log("Play time interval: " + JSON.stringify(interval));
        },
        pauseTimerInterval: (state, action) => {
            const interval = state.intervals.pop();
            if (interval.end_time == undefined) interval.end_time = action.payload.pauseTime;
        
            state.intervals.push(interval);
            console.log("Pause time interval: " + JSON.stringify(interval));
        },
        addSensorsInterval: (state, action) => {
            const interval = state.intervals.pop();
            interval.sensors_intervals = action.payload.sensorsIntervals
        
            state.intervals.push(interval);
            console.log("Add sensors intervals: " + JSON.stringify(interval));
        }
    }
});


export const {
    changeActivityType,
    newActivity,
    playActivity,
    pauseActivity,
    stopActivity,
    deleteActivity,
    playTimerInterval,
    pauseTimerInterval,
    addSensorsInterval
} = apiActivitySlice.actions;

export default apiActivitySlice.reducer;