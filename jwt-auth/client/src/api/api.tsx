import axios from 'axios'
import { AxiosResponse } from 'axios'
import { IAuthResponse } from '../types/authResponse'
import { IUser } from '../types/user'

const instance = axios.create({
	withCredentials: true,
	baseURL: 'http://localhost:5000/api'
})

instance.interceptors.request.use(config => {
	config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
	return config
})

instance.interceptors.response.use(
	config => config,
	async error => {
		const originalRequest = error.config
		if (error.response.status === 401 && error.config && !error.config._isRetry) {
			originalRequest._isRetry = true;
			try {
				const response = await axios.get<IAuthResponse>('http://localhost:5000/api/refresh', { withCredentials: true })
				localStorage.setItem('token', response.data.accessToken)
				return instance.request(originalRequest)
			} catch (e) {
				console.log('No Authorized')
			}
		}
		throw error
	}
)

const jwtAuthAPI = {
	async login(email: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
		const response = await instance.post<IAuthResponse>('/login', { email, password })
		return response
	},

	async registration(email: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
		const response = await instance.post<IAuthResponse>('/registration', { email, password })
		return response
	},

	async logout(): Promise<void> {
		return instance.post('/logout')
	},

	async fetchUsers(): Promise<AxiosResponse<IUser[]>> {
		return instance.get<IUser[]>('/users')
	}
}
export default jwtAuthAPI
