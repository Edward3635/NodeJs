import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setActivePage } from '../../../redux/appSlice'
import { getCoupons } from '../../../redux/couponsSlice'
import CouponItem from './CouponItem/CouponItem'
import cl from './Coupons.module.scss'
import BasicAlerts from '../../Common/Alert/Alert'

const Coupons = () => {
	const isLoadingPage = useSelector(state => state.coupons.isLoadingPage)
	const coupons = useSelector(state => state.coupons.coupons)
	const [isAlert, setIsAlert] = useState(null)
	const dispatch = useDispatch()

	const couponList = coupons.map(coupon => <CouponItem key={coupon._id} setIsAlert={setIsAlert} {...coupon} />)
	useEffect(() => {
		dispatch(setActivePage('Coupons'))
		dispatch(getCoupons())
	}, [])

	if (isLoadingPage) return <div className={cl.loader}>Loading...</div>
	return (
		<main className={cl.main}>
			{isAlert ? (
				<BasicAlerts severity={isAlert.type} text={isAlert.body} />
			) : (
				<div className={cl.title}>
					<span>You can use these promo codes in your orders</span>
				</div>
			)}
			<div className={cl.couponListWrapper}>
				<div className={!!coupons.length ? cl.couponList : cl.emptyPage}>
					{!!coupons.length ? couponList : 'Sorry, promo codes ran out'}
				</div>
			</div>
		</main>
	)
}

export default Coupons
