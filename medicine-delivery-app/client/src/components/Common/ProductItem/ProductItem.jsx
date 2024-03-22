import React from 'react'
import cl from './ProductItem.module.scss'

const ProductItem = ({ product, shop, quantity, image }) => {
	return (
		<div className={cl.item}>
			<div className={cl.description}>
				<div>
					<img src={image} alt='medicines' />
				</div>
				<div>
					<div className={cl.productInfo}>
						<span>{product.name} / </span>
						<span>
							{quantity} X {product.price}₴
						</span>
					</div>
					<div>From: {shop}</div>
				</div>
			</div>
		</div>
	)
}

export default ProductItem
