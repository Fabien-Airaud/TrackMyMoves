import { configureStore } from '@reduxjs/toolkit';
import accountReducer from './accountSlice';
import logInReducer from './logInSlice';

export default configureStore({
	reducer: {
		accounts: accountReducer,
		logIn: logInReducer
	}
});
