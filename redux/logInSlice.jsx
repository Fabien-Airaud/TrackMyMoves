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
            state.emailAddress = action.payload.emailAddress;
        },
        updateLogPassword: (state, action) => {
            state.password = action.payload.password;
        },
        updateLogFirstName: (state, action) => {
            state.firstName = action.payload.firstName;
        },
        updateLogLastName: (state, action) => {
            state.lastName = action.payload.lastName;
        },
        updateLogBirthdate: (state, action) => {
            state.birthdate = action.payload.birthdate;
        },
        updateLogHeight: (state, action) => {
            state.height = action.payload.height;
        },
        updateLogWeight: (state, action) => {
            state.weight = action.payload.weight;
        },
        updateLogCountry: (state, action) => {
            state.country = action.payload.country;
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