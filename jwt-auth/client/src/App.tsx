import React, { useEffect, useState } from 'react'
import cl from './style/App.module.scss'
import LoginForm from './components/LoginForm'
import { useAppDisptach, useAppSelector } from './hooks/redux'
import { checkAuth, logout, setError } from './redux/authSlice'
import { IUser } from './types/user'
import jwtAuthAPI from './api/api'

function App() {
	const [users, setUsers] = useState<IUser[]>([])
	const auth = useAppSelector(state => state.auth)
	const dispatch = useAppDisptach()

	async function getUsers() {
		try {
			const response = await jwtAuthAPI.fetchUsers()
			setUsers(response.data)
		} catch (e: any) {
			if (typeof e.response?.data?.message === 'string') {
				dispatch(setError(e.response?.data?.message))
			}
		}
	}

	useEffect(() => {
		if (localStorage.getItem('token')) {
			dispatch(checkAuth())
		}
	}, [])

	if (auth.isLoading) return <div className={cl.loading}>Loading...</div>
	if (!auth.isAuth)
		return (
			<div className={cl.appWrapper}>
				<div className={cl.app}>
					<p>Welcome to JWT auth app</p>
					<LoginForm />
					<div className={cl.getUsersWrapper}>
						<button className={cl.btn} onClick={getUsers}>
							Get all users
						</button>
						<span className={cl.getUsersError}>{auth.error}</span>
					</div>
				</div>
			</div>
		)

	return (
		<div className={cl.appWrapper}>
			<div className={cl.app}>
				<h1>
					User authorized <span>{auth.user.email}</span>
				</h1>
				<h1>{auth.user.isActivated ? 'Account confirmed' : 'Confirm your account by the mail'}</h1>
				<div className={cl.btns_container}>
					<button
						className={cl.btn}
						onClick={() => {
							dispatch(logout())
						}}
					>
						Exit
					</button>
					<div>
						<button className={cl.btn} onClick={getUsers}>
							Get all users
						</button>
					</div>
				</div>
				{users.map(user => (
					<div key={user.email}>{user.email}</div>
				))}
			</div>
		</div>
	)
}

export default App
