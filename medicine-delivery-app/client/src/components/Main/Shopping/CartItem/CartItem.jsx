import React from 'react'
import { useDispatch } from 'react-redux'
import cl from './CartItem.module.scss'
import { decrementQuantity, incrementQuantity } from '../../../../redux/shoppingSlice'

const CartItem = ({ name, price, quantity }) => {
	const dispatch = useDispatch()

	return (
		<div className={cl.item}>
			<div className={cl.img}></div>
			<div className={cl.description}>
				<h3>{name}</h3>
				<div>Price: {price} UAH</div>
				<div className={cl.counter}>
					<button type='button' onClick={() => dispatch(decrementQuantity(name))} className={cl.btn}>
						-
					</button>
					<div>{quantity}</div>
					<button type='button' onClick={() => dispatch(incrementQuantity(name))} className={cl.btn}>
						+
					</button>
				</div>
			</div>
		</div>
	)
}

export default CartItem
