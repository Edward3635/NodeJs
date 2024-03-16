import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { drugStoreAPI } from '../api/api'

const initialState = {
	shops: [],
	shopProducts: [],
	currentShop: { id: '', name: '' },
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
		updateCurrentShop(state, { payload }) {
			state.currentShop.name = payload.name
			state.currentShop.id = payload.id
		}
	},
	extraReducers: builder => {
		builder
			.addCase(getShops.fulfilled, (state, action) => {
				state.shops = action.payload
				state.currentShop.id = action.payload[0]._id
				state.currentShop.name = action.payload[0].name
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
export const { setShops, setError, updateCurrentShop } = drugStoreSlice.actions

export const getShops = createAsyncThunk('getShops', async (_, thunkAPI) => {
	try {
		const response = await drugStoreAPI.getShops()
		// localStorage.setItem('shops', response.data)
		return response
	} catch (e) {
		return thunkAPI.rejectWithValue(e.response.data)
	}
})

export const getProductsByShop = createAsyncThunk('getProductsByShop', async (shopId, thunkAPI) => {
	try {
		const response = await drugStoreAPI.getProductsByShop(`${shopId}`)
		return response
	} catch (e) {
		return thunkAPI.rejectWithValue(e.response.data)
	}
})
