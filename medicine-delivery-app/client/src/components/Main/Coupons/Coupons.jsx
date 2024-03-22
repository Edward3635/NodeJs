import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setActivePage } from '../../../redux/appSlice'
import { getCoupons } from '../../../redux/couponsSlice'
import CouponItem from './CouponItem/CouponItem'
import cl from './Coupons.module.scss'

const Coupons = () => {
	const isLoadingPage = useSelector(state => state.coupons.isLoadingPage)
	const coupons = useSelector(state => state.coupons.coupons)
	const dispatch = useDispatch()

	const couponList = coupons.map(coupon => <CouponItem key={coupons._id} />)
	console.log(coupons)
	useEffect(() => {
		dispatch(setActivePage('Coupons'))
		// dispatch(getCoupons())
	}, [])

	if (isLoadingPage) return <div>Loading...</div>
	return (
		<main className={cl.main}>
			<div>{!!coupons.length ? couponList : <div>Sorry, promo codes ran out</div>}</div>
		</main>
	)
}

export default Coupons
