import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import cl from './Shopping.module.scss'
import CartItem from './CartItem/CartItem'
import { calcTotal, setShoppingCart, submitForm } from '../../../redux/shoppingSlice'
import { setActivePage, setGlobalMessage } from '../../../redux/appSlice'
import { validationShoppingSchema } from '../../../services/shoppingValidation'

const Shopping = () => {
	const cart = useSelector(state => state.shopping.shoppingCart)
	const totalPrice = useSelector(state => state.shopping.totalPrice)
	const isOrderSubmitted = useSelector(state => state.shopping.isOrderSubmitted)
	const dispatch = useDispatch()
	const cartList = cart.map(item => (
		<CartItem key={item.product} name={item.name} price={item.price} quantity={item.quantity} />
	))
	const initialValues = {
		name: '',
		email: '',
		phone: '',
		address: ''
	}

	const handleSubmit = values => {
		const keysToDelete = ['name', 'price']
		const order = cart.map(obj => {
			let orderItem = { ...obj }
			keysToDelete.forEach(key => delete orderItem[key])
			return orderItem
		})
		values.totalPrice = totalPrice
		dispatch(submitForm({ userData: values, order }))
	}

	useEffect(() => {
		if (isOrderSubmitted === true) {
			dispatch(setGlobalMessage('Order submitted'))
			dispatch(setActivePage('Shop'))
		}
	}, [isOrderSubmitted])

	useEffect(() => {
		dispatch(setActivePage('Shopping'))
		const parsedCart = JSON.parse(localStorage.getItem('cart'))
		if (parsedCart && parsedCart.length) {
			dispatch(setShoppingCart(parsedCart))
		}
	}, [])

	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(cart))
		dispatch(calcTotal())
	}, [cart])

	return (
		<section>
			<Formik initialValues={initialValues} validationSchema={validationShoppingSchema} onSubmit={handleSubmit}>
				{({ errors, touched, isValid, dirty }) => (
					<Form>
						<div className={cl.formContainer}>
							<div className={cl.personalData}>
								<div className={cl.errLabel}>
									<label>
										Name<span className={cl.redStar}>*</span>
									</label>
									{errors.name && touched.name ? <div className={cl.error}>{errors.name}</div> : null}
								</div>
								<Field
									type='text'
									name='name'
									className={`${cl.input} ${errors.name && touched.name ? cl.inputError : null}`}
									placeholder='Name'
								/>
								<div className={cl.errLabel}>
									<label>
										Email<span className={cl.redStar}>*</span>
									</label>
									{errors.email && touched.email ? <div className={cl.error}>{errors.email}</div> : null}
								</div>
								<Field
									type='email'
									name='email'
									className={`${cl.input} ${errors.email && touched.email ? cl.inputError : null}`}
									placeholder='Example@gmail.com'
								/>
								<div className={cl.errLabel}>
									<label>
										Phone<span className={cl.redStar}>*</span>
									</label>
									{errors.phone && touched.phone ? <div className={cl.error}>{errors.phone}</div> : null}
								</div>
								<div className={cl.phoneNumberWrapper}>
									<span>+38</span>
									<Field
										type='tel'
										name='phone'
										className={`${cl.input} ${errors.phone && touched.phone ? cl.inputError : null}`}
										placeholder='0995654567'
									/>
								</div>
								<div className={cl.errLabel}>
									<label>
										Address<span className={cl.redStar}>*</span>
									</label>
									{errors.address && touched.address ? <div className={cl.error}>{errors.address}</div> : null}
								</div>
								<Field
									type='text'
									name='address'
									className={`${cl.input} ${errors.address && touched.address ? cl.inputError : null}`}
									placeholder='Address'
								/>
							</div>
							{cartList.length ? (
								<div className={cl.products}>{cartList}</div>
							) : (
								<div className={cl.emptyProducts}>There is no items yet...</div>
							)}
						</div>
						<div className={cl.total}>
							<h3>Total price: {totalPrice}</h3>
							<button
								disabled={!(isValid && dirty && cart.length)}
								type='submit'
								className={`${cl.btn} ${!(isValid && dirty && cart.length) ? cl.disabled : cl.enabled}`}
							>
								Submit
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</section>
	)
}

export default Shopping
