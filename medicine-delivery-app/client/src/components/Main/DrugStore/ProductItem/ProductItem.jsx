import React from 'react'
import cl from './ProductItem.module.scss'
import { useDispatch } from 'react-redux'
import { addProductToCart } from '../../../../redux/shoppingSlice'

const ProductItem = ({ name, price, id, shop }) => {
	const dispatch = useDispatch()
	return (
		<li className={cl.item}>
			<div className={cl.img}></div>
			<h3>{name}</h3>
			<div className={cl.btnWrapper}>
				<div>{price} UAH</div>
				<button
					className={cl.btn}
					onClick={() => {
						dispatch(addProductToCart({ id, name, price, quantity: 1, shopId: shop.id, shopName: shop.name }))
					}}
				>
					Add to cart
				</button>
			</div>
		</li>
	)
}

export default ProductItem
