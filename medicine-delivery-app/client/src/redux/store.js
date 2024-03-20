import { combineReducers, configureStore } from '@reduxjs/toolkit';
import drugStoreSlice from './drugStoreSlice';
import shoppingSlice from './shoppingSlice';
import appSlice from './appSlice';
import historySlice from './historySlice';

const reducers = combineReducers({
	app: appSlice,
	drugStore: drugStoreSlice,
	shopping:shoppingSlice,
	history: historySlice
});

const setupStore = () => {
	return configureStore({
		reducer: reducers,
	})
};


export default setupStore;