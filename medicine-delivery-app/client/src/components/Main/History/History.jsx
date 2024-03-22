import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setActivePage } from '../../../redux/appSlice'
import OrderForm from './OrderForm/OrderForm'
import cl from './History.module.scss'
import image from '../../../img/medicinesBG.jpg'
import ControlledAccordions from '../../Common/Accordion/Accordion'

const History = () => {
	const dispatch = useDispatch()
	const orders = useSelector(state => state.history.userOrders)
	const orderList = orders.map(order => <ControlledAccordions key={order._id} {...order} image={image} />)
	useEffect(() => {
		dispatch(setActivePage('History'))
	}, [])

	return (
		<main className={cl.main}>
			<OrderForm />
			<div className={cl.orderHistory}>
				<div className={cl.title}>
					<span>Order History</span>
				</div>
				{!!orders.length ? (
					<div className={cl.historyBody}>{orderList}</div>
				) : (
					<div className={`$ ${cl.emptyOrders}`}>
						<span>Find your orders right now</span>
					</div>
				)}
			</div>
		</main>
	)
}

export default History
