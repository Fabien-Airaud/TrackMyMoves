import { configureStore } from '@reduxjs/toolkit';
import accountReducer from './accountSlice';

export default configureStore({
	reducer: {
		accounts: accountReducer
	},
});
