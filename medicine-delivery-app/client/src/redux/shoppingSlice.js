import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { drugStoreAPI } from '../api/api'
import { setGlobalError } from './appSlice'

const initialState = {
	shoppingCart: [],
	totalPrice: 0,
	lastOrderId:'',
	isOrderSubmitted: false,
	isLoading: false
}

export const shoppingSlice = createSlice({
	name: 'shopping',
	initialState,
	reducers: {
		setShoppingCart(state, action) {
			state.shoppingCart = action.payload
		},
		addProductToCart(state, action) {
			const existingIndex = state.shoppingCart.findIndex(item => item.product === action.payload.product)
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
		},
		toggleIsOrderSubmitted(state, action) {
			state.isOrderSubmitted = action.payload
		}
	},
	extraReducers: builder => {
		builder
			.addCase(submitForm.fulfilled, (state, action) => {
				state.lastOrderId = action.payload._id
				state.shoppingCart = []
				state.isLoading = false
				state.isOrderSubmitted = true
			})
			.addCase(submitForm.pending, state => {
				state.isLoading = true
			})
			.addCase(submitForm.rejected, state => {
				state.isLoading = false
			})
	}
})
export default shoppingSlice.reducer
export const {
	setShoppingCart,
	addProductToCart,
	incrementQuantity,
	decrementQuantity,
	calcTotal,
	toggleIsOrderSubmitted
} = shoppingSlice.actions

export const submitForm = createAsyncThunk('submitForm', async (payload, thunkAPI) => {
	try {
		const response = await drugStoreAPI.submit(payload)
		return response
	} catch (e) {
		thunkAPI.dispatch(setGlobalError(e.response.data))
		return thunkAPI.rejectWithValue()
	}
})
