import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { drugStoreAPI } from '../api/api'

const initialState = {
	shoppingCart: [],
	totalPrice: 0,
	isLoading: false,
	error: ''
}

export const shoppingSlice = createSlice({
	name: 'shopping',
	initialState,
	reducers: {
		addProductToCart(state, action) {
			const existingIndex = state.shoppingCart.findIndex(item => item.id === action.payload.id)
			if (existingIndex !== -1) {
				state.shoppingCart[existingIndex].quantity++
			} else {
				state.shoppingCart.push(action.payload)
			}
		},
		incrementQuantity(state, action) {
			const findProduct = state.shoppingCart.find(
				product => product.name.toLowerCase() === action.payload.toLowerCase()
			)
			findProduct.quantity++
		},
		decrementQuantity(state, action) {
			const findProduct = state.shoppingCart.find(
				product => product.name.toLowerCase() === action.payload.toLowerCase()
			)
			if (findProduct.quantity > 0) findProduct.quantity--
			if (findProduct.quantity === 0) {
				const index = state.shoppingCart.indexOf(findProduct)
				state.shoppingCart.splice(index, 1)
			}
		},
		calcTotal(state) {
			state.totalPrice = state.shoppingCart.reduce((total, product) => {
				return total + product.price * product.quantity
			}, 0)
		}
	},
	extraReducers: builder => {
		builder
			.addCase(submitForm.fulfilled, state => {
				state.shoppingCart = []
				state.isLoading = false
				state.error = ''
			})
			.addCase(submitForm.pending, state => {
				state.isLoading = true
			})
			.addCase(submitForm.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload
			})
	}
})
export default shoppingSlice.reducer
export const { addProductToCart, incrementQuantity, decrementQuantity, calcTotal } = shoppingSlice.actions

export const submitForm = createAsyncThunk('submitForm', async (payload, thunkAPI) => {
	try {
		const response = await drugStoreAPI.submit(payload)
		// localStorage.setItem('orderData', response.data.accessToken)
		return response
	} catch (e) {
		return thunkAPI.rejectWithValue(e.response.data)
	}
})
