import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { drugStoreAPI } from '../api/api'
import { setGlobalError } from './appSlice'

const initialState = {
	coupons:[],
	isLoadingPage:false
}

export const couponsSlice = createSlice({
	name: 'coupons',
	initialState,
	reducers: {
		setCoupons(state, action) {
			state.coupons = action.payload
		}
	},
	extraReducers: builder => {
		builder
			.addCase(getCoupons.fulfilled, (state, action) => {
				state.userOrders = action.payload
				state.isLoadingPage = false
			})
			.addCase(getCoupons.pending, state => {
				state.isLoadingPage = true
			})
			.addCase(getCoupons.rejected, state => {
				state.isLoadingPage = false
			})
	}
})

export default couponsSlice.reducer
export const { setCoupons } = couponsSlice.actions

export const getCoupons = createAsyncThunk('getCoupons', async (_, thunkAPI) => {
	try {
		const response = await drugStoreAPI.getCoupons()
		return response
	} catch (e) {
		thunkAPI.dispatch(setGlobalError(e.response.data))
		return thunkAPI.rejectWithValue()
	}
})
