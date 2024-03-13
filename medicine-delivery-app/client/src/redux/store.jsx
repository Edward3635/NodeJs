import { combineReducers, configureStore } from '@reduxjs/toolkit';
import drugStoreSlice from './drugStoreSlice';
import shoppingSlice from './shoppingSlice';

const reducers = combineReducers({
	drugStore: drugStoreSlice,
	shopping:shoppingSlice
});

const setupStore = () => {
	return configureStore({
		reducer: reducers,
	})
};


export default setupStore;