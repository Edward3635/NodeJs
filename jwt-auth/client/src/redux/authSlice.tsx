import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../types/user'
import { IAuthState, ILoginPayload } from '../types/authState'
import jwtAuthAPI from '../api/api'
import axios from 'axios'
import { IAuthResponse } from '../types/authResponse'

const initialState: IAuthState = {
	user: {} as IUser,
	isAuth: false,
	isLoading: false,
	error: ''
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<IUser>) {
			state.user = action.payload
		},
		setAuth(state, action: PayloadAction<boolean>) {
			state.isAuth = action.payload
		},
		setError(state, action: PayloadAction<string>) {
			state.error = action.payload
		}
	},
	extraReducers: builder => {
		builder
			.addCase(login.fulfilled, (state, action: PayloadAction<IUser>) => {
				state.isAuth = true
				state.user = action.payload
				state.isLoading = false
				state.error = ''
			})
			.addCase(login.pending, state => {
				state.isLoading = true
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false
				if (typeof action.payload === 'string') {
					state.error = action.payload
				} else {
					state.error = 'Unknown error occurred'
				}
			})
			.addCase(registration.fulfilled, (state, action: PayloadAction<IUser>) => {
				state.isAuth = true
				state.user = action.payload
				state.isLoading = false
				state.error = ''
			})
			.addCase(registration.pending, state => {
				state.isLoading = true
			})
			.addCase(registration.rejected, (state, action) => {
				state.isLoading = false
				if (typeof action.payload === 'string') {
					state.error = action.payload
				} else {
					state.error = 'Unknown error occurred'
				}
			})
			.addCase(logout.fulfilled, state => {
				state.isAuth = false
				state.user = {} as IUser
			})
			.addCase(checkAuth.fulfilled, (state, action: PayloadAction<IUser>) => {
				state.isLoading = false
				state.isAuth = true
				state.user = action.payload
			})
			.addCase(checkAuth.pending, state => {
				state.isLoading = true
			})
			.addCase(checkAuth.rejected, (state, action) => {
				state.isLoading = false
				console.error(action.payload)
			})
	}
})
export default authSlice.reducer
export const { setUser, setAuth, setError } = authSlice.actions

export const login = createAsyncThunk('login', async (payload: ILoginPayload, thunkAPI) => {
	try {
		const response = await jwtAuthAPI.login(payload.email, payload.password)
		localStorage.setItem('token', response.data.accessToken)

		return response.data.user
	} catch (e: any) {
		if (typeof e.response?.data?.message === 'string') {
			return thunkAPI.rejectWithValue(e.response?.data?.message)
		}
		return thunkAPI.rejectWithValue('Error')
	}
})

export const registration = createAsyncThunk('registration', async (payload: ILoginPayload, thunkAPI) => {
	try {
		const response = await jwtAuthAPI.registration(payload.email, payload.password)
		localStorage.setItem('token', response.data.accessToken)

		return response.data.user
	} catch (e: any) {
		if (typeof e.response?.data?.message === 'string') {
			return thunkAPI.rejectWithValue(e.response?.data?.message)
		}
		return thunkAPI.rejectWithValue('Error')
	}
})

export const logout = createAsyncThunk('logout', async (_, thunkAPI) => {
	try {
		await jwtAuthAPI.logout()
		localStorage.removeItem('token')
	} catch (e: any) {
		console.log(e.response?.data?.message)
		return thunkAPI.rejectWithValue(e)
	}
})

export const checkAuth = createAsyncThunk('checkAuth', async (_, thunkAPI) => {
	try {
		const response = await axios.get<IAuthResponse>('http://localhost:5000/api/refresh', { withCredentials: true })
		localStorage.setItem('token', response.data.accessToken)
		return response.data.user
	} catch (e: any) {
		console.log(e.response?.data?.message)
		return thunkAPI.rejectWithValue(e)
	}
})
