import { IUser } from './user'

export interface IAuthState {
	user: IUser
	isAuth: boolean
	isLoading: boolean
	error: string
}

export interface ILoginPayload {
	email: string
	password: string
}
