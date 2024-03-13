import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { drugStoreAPI } from '../api/api'

const initialState = {
	shops: [],
	shopProducts: [],
	activeShop: '',
	isLoading: false,
	isLoadingProducts: false,
	error: ''
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
		updateActiveShop(state, action) {
			state.activeShop = action.payload
		}
	},
	extraReducers: builder => {
		builder
			.addCase(getShops.fulfilled, (state, action) => {
				state.shops = action.payload
				state.activeShop = action.payload[0]._id
				state.isLoading = false
				state.error = ''
			})
			.addCase(getShops.pending, state => {
				state.isLoading = true
			})
			.addCase(getShops.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload
			})
			.addCase(getProductsByShop.fulfilled, (state, action) => {
				state.shopProducts = action.payload
				state.isLoadingProducts = false
				state.error = ''
			})
			.addCase(getProductsByShop.pending, state => {
				state.isLoadingProducts = true
			})
			.addCase(getProductsByShop.rejected, (state, action) => {
				state.isLoadingProducts = false
				state.error = action.payload
			})
	}
})
export default drugStoreSlice.reducer
export const { setShops, setError, updateActiveShop } = drugStoreSlice.actions

export const getShops = createAsyncThunk('getShops', async (_, thunkAPI) => {
	try {
		const response = await drugStoreAPI.getShops()
		// localStorage.setItem('shops', response.data)
		return response
	} catch (e) {
		if (e) {
			return thunkAPI.rejectWithValue(e)
		}
		return thunkAPI.rejectWithValue('Error')
	}
})

export const getProductsByShop = createAsyncThunk('getProductsByShop', async (shopId, thunkAPI) => {
	try {
		const response = await drugStoreAPI.getProductsByShop(shopId)
		return response
	} catch (e) {
		if (e) {
			return thunkAPI.rejectWithValue(e)
		}
		return thunkAPI.rejectWithValue('Error')
	}
})
