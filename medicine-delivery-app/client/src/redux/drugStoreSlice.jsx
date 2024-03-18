import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { drugStoreAPI } from '../api/api'
import { setGlobalError } from './appSlice'

const initialState = {
	shops: [],
	shopProducts: [],
	currentShop: '',
	isLoadingPage: false,
	isLoadingProducts: false
}

export const drugStoreSlice = createSlice({
	name: 'drugStore',
	initialState,
	reducers: {
		setShops(state, action) {
			state.user = action.payload
		},
		setError(state, action) {
			state.error = action.payload
		},
		updateCurrentShop(state, { payload }) {
			state.currentShop = payload
		}
	},
	extraReducers: builder => {
		builder
			.addCase(getShops.fulfilled, (state, action) => {
				state.shops = action.payload
				state.currentShop = action.payload[0]._id
				state.isLoadingPage = false
				state.error = ''
			})
			.addCase(getShops.pending, state => {
				state.isLoadingPage = true
			})
			.addCase(getShops.rejected, (state, action) => {
				state.isLoadingPage = false
				state.error = action.payload
			})
			.addCase(getProductsByShop.fulfilled, (state, action) => {
				state.shopProducts = action.payload
				state.isLoadingProducts = false
			})
			.addCase(getProductsByShop.pending, state => {
				state.isLoadingProducts = true
			})
			.addCase(getProductsByShop.rejected, (state, action) => {
				state.isLoadingProducts = false
			})
	}
})
export default drugStoreSlice.reducer
export const { setShops, setError, updateCurrentShop } = drugStoreSlice.actions

export const getShops = createAsyncThunk('getShops', async (_, thunkAPI) => {
	try {
		const response = await drugStoreAPI.getShops()
		return response
	} catch (e) {
		thunkAPI.dispatch(setGlobalError(e.response.data))
		return thunkAPI.rejectWithValue()
	}
})

export const getProductsByShop = createAsyncThunk('getProductsByShop', async (shopId, thunkAPI) => {
	try {
		const response = await drugStoreAPI.getProductsByShop(`${shopId}`)
		return response
	} catch (e) {
		thunkAPI.dispatch(setGlobalError(e.response.data))
		return thunkAPI.rejectWithValue()
	}
})
