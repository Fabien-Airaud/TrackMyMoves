import { createSlice } from '@reduxjs/toolkit';
import { v4 } from 'uuid';

export const accountSlice = createSlice({
	name: 'accounts',
	initialState: [],
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

	},
});


export const { createAccount } = accountSlice.actions;

export default accountSlice.reducer;