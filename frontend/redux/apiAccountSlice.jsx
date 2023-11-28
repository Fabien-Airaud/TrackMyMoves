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
            console.log(JSON.stringify(state))
        }
    }
});


export const {
    changeAccount
} = apiAccountSlice.actions;

export default apiAccountSlice.reducer;