import { configureStore } from '@reduxjs/toolkit';

import accountReducer from './accountSlice';
import logInReducer from './logInSlice';
import activitySlice from './activitySlice';

export default configureStore({
	reducer: {
		accounts: accountReducer,
		logIn: logInReducer,
		activities: activitySlice
	}
});
