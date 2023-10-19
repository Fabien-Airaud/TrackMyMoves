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
        rememberMe: false
    },
    reducers: {
        logInAccount: (state, action) => {
            state.account = action.payload.account;
            state.rememberMe = action.payload.rememberMe;
        },
        updateLogEmailAddress: (state, action) => {
            state.account.emailAddress = action.payload.emailAddress;
        }
    }
});

export const { logInAccount, updateLogEmailAddress } = logInSlice.actions;

export default logInSlice.reducer;