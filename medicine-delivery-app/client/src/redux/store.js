import { combineReducers, configureStore } from '@reduxjs/toolkit';
import drugStoreSlice from './drugStoreSlice';
import shoppingSlice from './shoppingSlice';
import appSlice from './appSlice';
import historySlice from './historySlice';
import couponsSlice from './couponsSlice';

const reducers = combineReducers({
	app: appSlice,
	drugStore: drugStoreSlice,
	shopping:shoppingSlice,
	history: historySlice,
	coupons: couponsSlice
});

const setupStore = () => {
	return configureStore({
		reducer: reducers,
	})
};


export default setupStore;