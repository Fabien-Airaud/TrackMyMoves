import { createSlice } from '@reduxjs/toolkit';

export const logInSlice = createSlice({
    name: 'logIn',
    initialState: {
        account: {
            id: '4fbbfd11-4e35-482f-b69d-8fbb3d4f175d',
            emailAddress: 'airaudfabien@gmail.com',
            password: 'Fabien2002',
            firstName: 'Fabien',
            lastName: 'Airaud',
            birthdate: '2002-11-26T05:00:00.000Z',
            height: '192',
            weight: '63',
            country: 'Canada'
        },
        rememberMe: true
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