import { createSlice } from '@reduxjs/toolkit';

export const logInSlice = createSlice({
    name: 'logIn',
    initialState: {
        account: undefined,
        rememberMe: false
    },
    reducers: {
        logInAccount: (state, action) => {
            state.account = action.payload.account;
            state.rememberMe = action.payload.rememberMe;
        },
        logOutAccount: (state) => {
            state.account = undefined;
            state.rememberMe = false;
        },
        updateLogEmailAddress: (state, action) => {
            state.account.emailAddress = action.payload.emailAddress;
        },
        updateLogPassword: (state, action) => {
            state.account.password = action.payload.password;
        },
        updateLogFirstName: (state, action) => {
            state.account.firstName = action.payload.firstName;
        },
        updateLogLastName: (state, action) => {
            state.account.lastName = action.payload.lastName;
        },
        updateLogBirthdate: (state, action) => {
            state.account.birthdate = action.payload.birthdate;
        },
        updateLogHeight: (state, action) => {
            state.account.height = action.payload.height;
        },
        updateLogWeight: (state, action) => {
            state.account.weight = action.payload.weight;
        },
        updateLogCountry: (state, action) => {
            state.account.country = action.payload.country;
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