import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { drugStoreAPI } from '../api/api'
import { setGlobalError } from './appSlice'

const initialState = {
	userOrders: [],
	isLoadingData: false
}

export const historySlice = createSlice({
	name: 'history',
	initialState,
	reducers: {
		setUserOrders(state, action) {
			state.userOrders = action.payload
		}
	},
	extraReducers: builder => {
		builder
			.addCase(getUserOrders.fulfilled, (state, action) => {
				state.userOrders = action.payload
				state.isLoadingData = false
			})
			.addCase(getUserOrders.pending, state => {
				state.isLoadingData = true
			})
			.addCase(getUserOrders.rejected, state => {
				state.isLoadingData = false
			})
	}
})

export default historySlice.reducer
export const { setUserOrders } = historySlice.actions

export const getUserOrders = createAsyncThunk('getUserOrders', async (payload, thunkAPI) => {
	try {
		const response = await drugStoreAPI.getUserOrders(payload)
		return response
	} catch (e) {
		thunkAPI.dispatch(setGlobalError(e.response.data))
		return thunkAPI.rejectWithValue()
	}
})
