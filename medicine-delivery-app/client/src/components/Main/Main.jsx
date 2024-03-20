import React from 'react'
import DrugStore from './DrugStore/DrugStore'
import Shopping from './Shopping/Shopping'
import { Navigate, Route, Routes } from 'react-router-dom'
import History from './History/History'

const Main = () => {
	return (
		<>
			<Routes>
				<Route index element={<DrugStore />} />
				<Route path='/shopping' element={<Shopping />} />
				<Route path='/history' element={<History />} />
				<Route path='/*' element={<Navigate to='/' />} />
			</Routes>
		</>
	)
}

export default Main
