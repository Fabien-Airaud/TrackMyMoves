import { configureStore } from '@reduxjs/toolkit';

import apiAccountSlice from './apiAccountSlice';
import apiActivityInfosSlice from './apiActivityInfosSlice';
import apiActivitySlice from './apiActivitySlice';

export default configureStore({
	reducer: {
		apiAccount: apiAccountSlice,
		apiActivity: apiActivitySlice,
		apiActivityInfos: apiActivityInfosSlice
	}
});
