import { configureStore } from '@reduxjs/toolkit';

import accountReducer from './accountSlice';
import apiAccountSlice from './apiAccountSlice';
import apiActivitySlice from './apiActivitySlice';
import currentActivitySlice from './currentActivitySlice';
import logInReducer from './logInSlice';
import apiActivityInfosSlice from './apiActivityInfosSlice';

export default configureStore({
	reducer: {
		accounts: accountReducer,
		logIn: logInReducer,
		currentActivity: currentActivitySlice,
		apiAccount: apiAccountSlice,
		apiActivity: apiActivitySlice,
		apiActivityInfos: apiActivityInfosSlice
	}
});
