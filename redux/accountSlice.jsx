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

	},
});


export const { createAccount } = accountSlice.actions;

export default accountSlice.reducer;