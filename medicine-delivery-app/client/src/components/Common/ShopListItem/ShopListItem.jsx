import React from 'react'
import cl from './ShopListItem.module.scss'
import { useDispatch } from 'react-redux'
import { updateActiveShop } from '../../../redux/drugStoreSlice'

const ShopListItem = ({ name, active, id }) => {
	const dispatch = useDispatch()
	return (
		<li
			onClick={() => {
				if (id !== active) dispatch(updateActiveShop(id))
			}}
			className={`${cl.listItem} ${active === id && cl.active}`}
		>
			<div>{name}</div>
		</li>
	)
}

export default ShopListItem
