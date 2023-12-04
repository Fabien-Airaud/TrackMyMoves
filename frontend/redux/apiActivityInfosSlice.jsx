import { createSlice } from '@reduxjs/toolkit';

export const apiActivityInfosSlice = createSlice({
    name: 'apiActivityInfos',
    initialState: {},
    reducers: {
        changeActivityInfos: (state, action) => {
            return action.payload;
        }
    }
});


export const {
    changeActivityInfos
} = apiActivityInfosSlice.actions;

export default apiActivityInfosSlice.reducer;