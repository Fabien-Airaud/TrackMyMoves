import { createSlice } from '@reduxjs/toolkit';

export const logInSlice = createSlice({
    name: 'logIn',
    initialState: null,
    reducers: {
        logInAccount: (state, action) => {
            return action.payload;
        },
        logOutAccount: (state) => {
            return null;
        },
        updateLogEmailAddress: (state, action) => {
            state.emailAddress = action.payload;
        },
        updateLogPassword: (state, action) => {
            state.password = action.payload;
        },
        updateLogFirstName: (state, action) => {
            state.firstName = action.payload;
        },
        updateLogLastName: (state, action) => {
            state.lastName = action.payload;
        },
        updateLogBirthdate: (state, action) => {
            state.birthdate = action.payload;
        },
        updateLogHeight: (state, action) => {
            state.height = action.payload;
        },
        updateLogWeight: (state, action) => {
            state.weight = action.payload;
        },
        updateLogCountry: (state, action) => {
            state.country = action.payload;
        }
    }
});

export const {
    logInAccount,
    logOutAccount,
    updateLogEmailAddress,
    updateLogPassword,
    updateLogFirstName,
    updateLogLastName,
    updateLogBirthdate,
    updateLogHeight,
    updateLogWeight,
    updateLogCountry
} = logInSlice.actions;

export default logInSlice.reducer;