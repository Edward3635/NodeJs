import React from 'react'
import cl from './Header.module.scss'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setActivePage } from '../../redux/appSlice'

const Header = () => {
	const activeLink = useSelector(state => state.app.activePage)
	const dispatch = useDispatch()
	return (
		<header className={cl.header}>
			<ul className={cl.headerList}>
				<li className={`${cl.listItem} ${activeLink === 'Shop' && cl.activeLink}`}>
					<NavLink
						to='/'
						onClick={() => {
							dispatch(setActivePage('Shop'))
						}}
					>
						Shop
					</NavLink>
				</li>
				<li className={cl.itemBorder}></li>
				<li className={`${cl.listItem} ${cl.grow1} ${activeLink === 'Shopping' && cl.activeLink}`}>
					<NavLink
						to='/shopping'
						onClick={() => {
							dispatch(setActivePage('Shopping'))
						}}
					>
						Shopping Cart
					</NavLink>
				</li>
				<li className={cl.itemBorder}></li>
				<li className={`${cl.listItem} ${activeLink === 'History' && cl.activeLink}`}>
					<NavLink
						to='/history'
						onClick={() => {
							dispatch(setActivePage('History'))
						}}
					>
						History
					</NavLink>
				</li>
				<li className={cl.itemBorder}></li>
				<li className={`${cl.listItem} ${activeLink === 'Coupons' && cl.activeLink}`}>
					<NavLink
						to='/coupons'
						onClick={() => {
							dispatch(setActivePage('Coupons'))
						}}
					>
						Coupons
					</NavLink>
				</li>
			</ul>
		</header>
	)
}

export default Header
