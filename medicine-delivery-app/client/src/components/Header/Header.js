import React, { useState } from 'react'
import cl from './Header.module.scss'
import { NavLink } from 'react-router-dom'

const Header = () => {
	const [activeLink, setActiveLink] = useState('Shop')
	return (
		<nav className={cl.header}>
			<ul className={cl.headerList}>
				<li className={`${cl.listItem} ${activeLink === 'Shop' && cl.activeLink}`}>
					<NavLink
						to='/'
						onClick={() => {
							setActiveLink('Shop')
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
							setActiveLink('Shopping')
						}}
					>
						Shopping Cart
					</NavLink>
				</li>
				<li className={cl.itemBorder}></li>
				<li className={`${cl.listItem} ${activeLink === 'History' && cl.activeLink}`}>
					<NavLink
						to='/History'
						onClick={() => {
							setActiveLink('History')
						}}
					>
						History
					</NavLink>
				</li>
			</ul>
		</nav>
	)
}

export default Header
