import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setActivePage } from '../../../redux/appSlice'
import OrderForm from './OrderForm/OrderForm'
import cl from './History.module.scss'
import OrderItem from '../../Common/OrderItem/OrderItem'

const History = () => {
	const dispatch = useDispatch()
	const orders = useSelector(state => state.history.userOrders)
	const orderList = orders.map(order => <OrderItem key={order._id} {...order} />)
	useEffect(() => {
		dispatch(setActivePage('History'))
	}, [])

	return (
		<main className={cl.main}>
			<OrderForm />
			<div className={cl.orderHistory}>{!!orders.length ? orderList : <div>Empty order history</div>}</div>
		</main>
	)
}

export default History
