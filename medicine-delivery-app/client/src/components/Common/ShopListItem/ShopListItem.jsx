import React from 'react'
import cl from './ShopListItem.module.scss'
import { useDispatch } from 'react-redux'
import { updateCurrentShop } from '../../../redux/drugStoreSlice'

const ShopListItem = ({ name, currentShopId, id }) => {
	const dispatch = useDispatch()
	return (
		<li
			onClick={() => {
				if (id !== currentShopId) dispatch(updateCurrentShop({ id, name }))
			}}
			className={`${cl.listItem} ${currentShopId === id && cl.active}`}
		>
			<div>{name}</div>
		</li>
	)
}

export default ShopListItem
