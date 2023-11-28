import { createSlice } from '@reduxjs/toolkit';

export const apiAccountSlice = createSlice({
    name: 'apiAccount',
    initialState: {
        token: null,
        account: null
    },
    reducers: {
        newAccount: (state, action) => {
            state.token = action.payload.token;
            state.account = action.payload.account;
            console.log("New account: " + JSON.stringify(state))
        },
        changeAccount: (state, action) => {
            state.account = action.payload;
            console.log("Change account: " + JSON.stringify(state))
        },
        removeAccount: (state) => {
            state.token = null
            state.account = null;
            console.log("Remove account: " + JSON.stringify(state))
        }
    }
});


export const {
    newAccount,
    changeAccount,
    removeAccount
} = apiAccountSlice.actions;

export default apiAccountSlice.reducer;