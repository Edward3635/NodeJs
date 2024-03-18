import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	activePage: 'Shop',
	globalError: [],
	globalMessage: '',
	isOpenModal: false
}

export const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setActivePage(state, action) {
			state.activePage = action.payload
		},
		setGlobalError(state, action) {
			const errorExists = state.globalError.some(error => error.message === action.payload.message)
			if (!errorExists) {
				state.globalError.push(action.payload)
				state.isOpenModal = true
			}
		},
		clearGlobalError(state) {
			state.globalError = []
			state.isOpenModal = false
		},
		setGlobalMessage(state, action) {
			state.globalMessage = action.payload
			state.isOpenModal = true
		},
		clearGlobalMessage(state) {
			state.globalMessage = []
			state.isOpenModal = false
		}
	}
})
export default appSlice.reducer
export const { setActivePage, setGlobalError, clearGlobalError, setGlobalMessage,clearGlobalMessage} = appSlice.actions
