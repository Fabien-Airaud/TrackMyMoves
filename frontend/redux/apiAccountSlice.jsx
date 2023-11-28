import { createSlice } from '@reduxjs/toolkit';

export const apiAccountSlice = createSlice({
    name: 'apiAccount',
    initialState: {
        token: null,
        account: null
    },
    reducers: {
        changeAccount: (state, action) => {
            state.account = action.payload;
            console.log("Change account: " + JSON.stringify(state))
        },
        removeAccount: (state) => {
            state.account = null;
            console.log("Remove account: " + JSON.stringify(state))
        }
    }
});


export const {
    changeAccount,
    removeAccount
} = apiAccountSlice.actions;

export default apiAccountSlice.reducer;