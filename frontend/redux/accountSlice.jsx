import { createSlice } from '@reduxjs/toolkit';
import { v4 } from 'uuid';

export const accountSlice = createSlice({
    name: 'accounts',
    initialState: [{
        id: '4fbbfd11-4e35-482f-b69d-8fbb3d4f175d',
        emailAddress: 'airaudfabien@gmail.com',
        password: 'Fabien2002',
        firstName: 'Fabien',
        lastName: 'Airaud',
        birthdate: '2002-11-26T05:00:00.000Z',
        height: '192',
        weight: '63',
        country: 'Canada'
    }],
    reducers: {
        createAccount: (state, action) => {
            const account = {
                id: v4(),
                emailAddress: action.payload.emailAddress,
                password: action.payload.password,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                birthdate: action.payload.birthdate,
                height: action.payload.height,
                weight: action.payload.weight,
                country: action.payload.country
            };
            state.push(account);
        },
        deleteAccount: (state, action) => {
            return state.filter((account) => account.id !== action.payload.id);
        },
        updateEmailAddress: (state, action) => {
            const index = state.findIndex((account) => account.id === action.payload.id);
            state[index].emailAddress = action.payload.emailAddress;
        },
        updatePassword: (state, action) => {
            const index = state.findIndex((account) => account.id === action.payload.id);
            state[index].password = action.payload.password;
        },
        updateFirstName: (state, action) => {
            const index = state.findIndex((account) => account.id === action.payload.id);
            state[index].firstName = action.payload.firstName;
        },
        updateLastName: (state, action) => {
            const index = state.findIndex((account) => account.id === action.payload.id);
            state[index].lastName = action.payload.lastName;
        },
        updateBirthdate: (state, action) => {
            const index = state.findIndex((account) => account.id === action.payload.id);
            state[index].birthdate = action.payload.birthdate;
        },
        updateHeight: (state, action) => {
            const index = state.findIndex((account) => account.id === action.payload.id);
            state[index].height = action.payload.height;
        },
        updateWeight: (state, action) => {
            const index = state.findIndex((account) => account.id === action.payload.id);
            state[index].weight = action.payload.weight;
        },
        updateCountry: (state, action) => {
            const index = state.findIndex((account) => account.id === action.payload.id);
            state[index].country = action.payload.country;
        }
    }
});


export const {
    createAccount,
    deleteAccount,
    updateEmailAddress,
    updatePassword,
    updateFirstName,
    updateLastName,
    updateBirthdate,
    updateHeight,
    updateWeight,
    updateCountry
} = accountSlice.actions;

export default accountSlice.reducer;