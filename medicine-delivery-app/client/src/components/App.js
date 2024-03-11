import React, { useEffect, useState } from 'react'
import cl from '../style/App.module.scss'

function App() {
	const [data, setData] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('https://nodejs-production-9965.up.railway.app/shops')
				const jsonData = await response.json()
				setData(jsonData)
				console.log(jsonData)
				setLoading(false)
			} catch (error) {
				console.error('Error fetching data:', error)
				setLoading(false)
			}
		}

		fetchData()
	}, [])
	return <div className={cl.app}></div>
}

export default App
