import { combineReducers, configureStore } from '@reduxjs/toolkit';
import drugStoreSlice from './drugStoreSlice';
import shoppingSlice from './shoppingSlice';
import appSlice from './appSlice';

const reducers = combineReducers({
	app: appSlice,
	drugStore: drugStoreSlice,
	shopping:shoppingSlice
});

const setupStore = () => {
	return configureStore({
		reducer: reducers,
	})
};


export default setupStore;