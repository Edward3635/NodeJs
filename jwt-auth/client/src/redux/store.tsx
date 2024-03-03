import authSlice from './authSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

const reducers = combineReducers({
	auth: authSlice,
});

const setupStore = () => {
	return configureStore({
		reducer: reducers,
	})
};

export type ReducersState = ReturnType<typeof reducers>;
export type AppStore = ReturnType<typeof setupStore>;
export type appDispatch = AppStore['dispatch'];

export default setupStore;