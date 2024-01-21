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
        },
        newActivity: (state, action) => {
            const start = new Date().toISOString();
            const interval = {
                start_datetime: start,
                start_time: 0,
                sensors_intervals: []
            };

            state.current_state = ActivityState.ongoing;
            state.user = action.payload.userId;
            state.start_datetime = start;
            state.intervals = [interval];
        },
        playActivity: (state) => {
            const last_interval = state.intervals.pop();
            const interval = {
                start_datetime: new Date().toISOString(),
                start_time: last_interval.end_time,
                sensors_intervals: []
            };

            state.current_state = ActivityState.ongoing;
            state.intervals.push(last_interval);
            state.intervals.push(interval);
        },
        pauseActivity: (state) => {
            const interval = state.intervals.pop();
            interval.end_datetime = new Date().toISOString();
            interval.end_time = interval.start_time + (new Date(interval.end_datetime) - new Date(interval.start_datetime));

            state.current_state = ActivityState.paused;
            state.intervals.push(interval);
        },
        stopActivity: (state) => {
            const end = new Date().toISOString();
            const interval = state.intervals.pop();
            if (interval.end_datetime == undefined) {
                interval.end_datetime = end;
                interval.end_time = interval.start_time + (new Date(interval.end_datetime) - new Date(interval.start_datetime));
            }

            state.current_state = ActivityState.stopped;
            state.intervals.push(interval);
            state.end_datetime = end;
            state.total_time = interval.end_time;
        },
        deleteActivity: () => {
            return {
                current_state: ActivityState.starting
            };
        },
        addSensorsInterval: (state, action) => {
            const interval = state.intervals.pop();
            interval.sensors_intervals = action.payload.sensorsIntervals
        
            state.intervals.push(interval);
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
    addSensorsInterval
} = apiActivitySlice.actions;

export default apiActivitySlice.reducer;