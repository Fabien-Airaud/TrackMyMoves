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
        },
        changeAccount: (state, action) => {
            state.account = action.payload;
        },
        removeAccount: (state) => {
            state.token = null
            state.account = null;
        }
    }
});


export const {
    newAccount,
    changeAccount,
    removeAccount
} = apiAccountSlice.actions;

export default apiAccountSlice.reducer;