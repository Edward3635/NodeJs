import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsByShop, getShops } from '../../../redux/drugStoreSlice'
import cl from './DrugStore.module.scss'
import ShopListItem from '../../Common/ShopListItem/ShopListItem'
import ProductItem from './ProductItem/ProductItem'
import { setActivePage } from '../../../redux/appSlice'

const DrugStore = () => {
	const dispatch = useDispatch()
	const store = useSelector(state => state.drugStore.shops)
	const products = useSelector(state => state.drugStore.shopProducts)
	const isLoading = useSelector(state => state.drugStore.isLoadingPage)
	const isLoadingProducts = useSelector(state => state.drugStore.isLoadingProducts)
	const currentShop = useSelector(state => state.drugStore.currentShop)
	const shopList = store.map(shop => (
		<ShopListItem key={shop.name} id={shop._id} name={shop.name} currentShop={currentShop} />
	))
	const productList = products.map(product => (
		<ProductItem key={product._id} name={product.name} shop={currentShop} id={product._id} price={product.price} />
	))

	useEffect(() => {
		dispatch(setActivePage('Shop'))
	}, [])

	useEffect(() => {
		if (store.length === 0) dispatch(getShops())
	}, [store])
	useEffect(() => {
		dispatch(getProductsByShop(currentShop))
	}, [currentShop])

	if (isLoading) return <div>Loading...</div>

	return (
		<main className={cl.main}>
			<aside className={cl.aside}>
				<div className={cl.asideTitle}>Shops:</div>
				<ul className={cl.shopList}>{shopList}</ul>
			</aside>
			<section className={cl.secProducts}>
				<ul className={cl.productList}>{isLoadingProducts ? <div>Loading</div> : productList}</ul>
			</section>
		</main>
	)
}

export default DrugStore
