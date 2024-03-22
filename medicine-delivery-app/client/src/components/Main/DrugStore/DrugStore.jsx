import React, { useEffect, useState } from 'react'
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
	const cart = useSelector(state => state.shopping.shoppingCart)
	const totalPrice = useSelector(state => state.shopping.totalPrice)
	const isLoadingProducts = useSelector(state => state.drugStore.isLoadingProducts)
	const currentShop = useSelector(state => state.drugStore.currentShop)
	const [favourite, setFavourite] = useState([])
	const [sortBy, setSortBy] = useState('Default')
	const shopList = store.map(shop => (
		<ShopListItem key={shop.name} id={shop._id} name={shop.name} currentShop={currentShop} />
	))

	const sortedArr = products => {
		const favouriteProducts = products.filter(product => favourite.includes(product._id))
		const otherProducts = products.filter(product => !favourite.includes(product._id))
		if (sortBy === 'PriceLowToHigh') {
			favouriteProducts.sort((a, b) => a.price - b.price)
			otherProducts.sort((a, b) => a.price - b.price)
			return [...favouriteProducts, ...otherProducts]
		} else if (sortBy === 'PriceHighToLow') {
			favouriteProducts.sort((a, b) => b.price - a.price)
			otherProducts.sort((a, b) => b.price - a.price)
			return [...favouriteProducts, ...otherProducts]
		} else return products
	}

	const productList = sortedArr(products).map(product => (
		<ProductItem
			key={product._id}
			name={product.name}
			shop={currentShop}
			id={product._id}
			price={product.price}
			favourite={favourite}
			setFavourite={setFavourite}
		/>
	))

	useEffect(() => {
		dispatch(setActivePage('Shop'))
		dispatch(getShops())
	}, [])

	useEffect(() => {
		if (currentShop) dispatch(getProductsByShop(currentShop))
	}, [currentShop])

	useEffect(() => {
		if (!!cart.length) localStorage.setItem('cart', JSON.stringify(cart))
	}, [cart])

	if (isLoading) return <div>Loading...</div>

	return (
		<main className={cl.main}>
			<aside className={cl.aside}>
				<div className={cl.asideTitle}>Shops:</div>
				<ul className={cl.shopList}>{shopList}</ul>
			</aside>
			<section className={cl.secProducts}>
				<div className={cl.selectSort}>
					<select
						value={sortBy}
						className={cl.input}
						onChange={e => {
							setSortBy(e.target.value)
						}}
					>
						<option value='Default'>Default</option>
						<option value='PriceLowToHigh'>Sort by price &uarr;</option>
						<option value='PriceHighToLow'>Sort by price &darr;</option>
					</select>
					<span className={cl.total}>Total price: {totalPrice}₴</span>
				</div>
				<ul className={cl.productList}>{isLoadingProducts ? <div>Loading</div> : productList}</ul>
			</section>
		</main>
	)
}

export default DrugStore
