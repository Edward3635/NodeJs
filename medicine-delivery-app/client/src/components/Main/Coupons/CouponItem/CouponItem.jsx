import React from 'react'
import image from '../../../../img/promocode.avif'
import cl from './CouponItem.module.scss'

const CouponItem = ({ setIsAlert, ...coupon }) => {
	const copyCoupon = () => {
		navigator.clipboard
			.writeText(coupon.code)
			.then(() => {
				setIsAlert({ type: 'success', body: 'Promo was copied successfully' })
				setTimeout(() => {
					setIsAlert(null)
				}, 3000)
			})
			.catch(err => {
				setIsAlert({ type: 'error', body: err })
				setTimeout(() => {
					setIsAlert(null)
				}, 3000)
			})
	}

	return (
		<div className={cl.item}>
			<img src={image} alt='medicines' />
			<h1>{coupon.name}</h1>
			<button className={cl.copyBtn} onClick={copyCoupon}>
				Copy Promo
			</button>
		</div>
	)
}

export default CouponItem
