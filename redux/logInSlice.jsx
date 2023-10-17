import { createSlice } from '@reduxjs/toolkit';

export const logInSlice = createSlice({
    name: 'logIn',
    initialState: { account: undefined, rememberMe: false },
    reducers: {
        logInAccount: (state, action) => {
            state.account = action.payload.account;
            state.rememberMe = action.payload.rememberMe;
        }
    }
});

export const { logInAccount } = logInSlice.actions;

export default logInSlice.reducer;