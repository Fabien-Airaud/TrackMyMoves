import { configureStore } from '@reduxjs/toolkit';

import accountReducer from './accountSlice';
import activitySlice from './activitySlice';
import currentActivitySlice from './currentActivitySlice';
import logInReducer from './logInSlice';

export default configureStore({
	reducer: {
		accounts: accountReducer,
		logIn: logInReducer,
		currentActivity: currentActivitySlice,
		activities: activitySlice
	}
});
