import { configureStore } from '@reduxjs/toolkit';

import accountReducer from './accountSlice';
import apiAccountSlice from './apiAccountSlice';
import currentActivitySlice from './currentActivitySlice';
import logInReducer from './logInSlice';

export default configureStore({
	reducer: {
		accounts: accountReducer,
		logIn: logInReducer,
		currentActivity: currentActivitySlice,
		apiAccount: apiAccountSlice
	}
});
