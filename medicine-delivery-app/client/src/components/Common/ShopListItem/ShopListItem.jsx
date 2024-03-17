import React from 'react'
import cl from './ShopListItem.module.scss'
import { useDispatch } from 'react-redux'
import { updateCurrentShop } from '../../../redux/drugStoreSlice'

const ShopListItem = ({ name, currentShop, id }) => {
	const dispatch = useDispatch()
	return (
		<li
			onClick={() => {
				if (id !== currentShop) dispatch(updateCurrentShop(id))
			}}
			className={`${cl.listItem} ${currentShop === id && cl.active}`}
		>
			<div>{name}</div>
		</li>
	)
}

export default ShopListItem
