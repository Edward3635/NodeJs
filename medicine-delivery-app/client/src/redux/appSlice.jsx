import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	activePage: ''
}

export const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setActivePage(state, action) {
			state.activePage = action.payload
		}
	}
})
export default appSlice.reducer
export const { setActivePage } = appSlice.actions
