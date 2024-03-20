import React from 'react'
import cl from './ProductItem.module.scss'
import { useDispatch } from 'react-redux'
import { addProductToCart, calcTotal } from '../../../../redux/shoppingSlice'
import image from '../../../../img/medicinesBG.jpg'

const ProductItem = ({ name, price, id, shop, favourite, setFavourite }) => {
	const dispatch = useDispatch()
	const toggleFavProduct = id => {
		if (favourite.includes(id)) {
			setFavourite(favourite.filter(item => item !== id))
		} else setFavourite([...favourite, id])
	}
	return (
		<li className={cl.item}>
			<div className={cl.img}>
				<img src={image} alt='medicines' />
				<div onClick={() => toggleFavProduct(id)} className={`${favourite.includes(id) ? cl.starActive : cl.star}`}>
					{favourite.includes(id) ? '\u2605' : '\u2606'}
				</div>
			</div>
			<h3>{name}</h3>
			<div className={cl.btnWrapper}>
				<div>{price} UAH</div>
				<button
					className={cl.btn}
					onClick={() => {
						dispatch(addProductToCart({ product: id, quantity: 1, name, price, shop }))
						dispatch(calcTotal())
					}}
				>
					Add to cart
				</button>
			</div>
		</li>
	)
}

export default ProductItem
