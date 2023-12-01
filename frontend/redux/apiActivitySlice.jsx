import { createSlice } from '@reduxjs/toolkit';

export const apiActivitySlice = createSlice({
    name: 'apiActivity',
    initialState: {},
    reducers: {
        changeActivityType: (state, action) => {
            state.activityType = action.payload.activityType
            console.log("Change activityType: " + JSON.stringify(state))
        }
    }
});


export const {
    changeActivityType
} = apiActivitySlice.actions;

export default apiActivitySlice.reducer;