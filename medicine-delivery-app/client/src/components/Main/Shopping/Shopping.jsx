import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import { validationSchema } from '../../../services/validation'
import cl from './Shopping.module.scss'
import CartItem from './CartItem/CartItem'
import { calcTotal, submitForm } from '../../../redux/shoppingSlice'
import { useNavigate } from 'react-router-dom'
import { setActivePage } from '../../../redux/appSlice'

const Shopping = () => {
	const cart = useSelector(state => state.shopping.shoppingCart)
	const totalPrice = useSelector(state => state.shopping.totalPrice)
	const navigate = useNavigate()
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
		values.phone = '+38' + values.phone
		dispatch(submitForm({ userData: values, order }))
		navigate('/')
		dispatch(setActivePage('Shop'))
	}
	useEffect(() => {
		dispatch(setActivePage('Shopping'))
	}, [])

	useEffect(() => {
		dispatch(calcTotal())
	}, [cart])

	return (
		<section>
			<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
				{({ errors, touched, isValid, dirty }) => (
					<Form>
						<div className={cl.formContainer}>
							<div className={cl.personalData}>
								<div className={cl.errLabel}>
									<label>Name:</label>
									{errors.name && touched.name ? <div className={cl.error}>{errors.name}</div> : null}
								</div>
								<Field
									type='text'
									name='name'
									className={`${cl.input} ${errors.name && touched.name ? cl.inputError : null}`}
									placeholder='Name'
								/>
								<div className={cl.errLabel}>
									<label>Email:</label>
									{errors.email && touched.email ? <div className={cl.error}>{errors.email}</div> : null}
								</div>
								<Field
									type='email'
									name='email'
									className={`${cl.input} ${errors.email && touched.email ? cl.inputError : null}`}
									placeholder='Email'
								/>
								<div className={cl.errLabel}>
									<label>Phone:</label>
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
									<label>Address:</label>
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
								<div className={cl.emptyProducts}>There are no items yet...</div>
							)}
						</div>
						<div className={cl.total}>
							<h3>Total price: {totalPrice}</h3>
							<button
								disabled={!(isValid && dirty)}
								type='submit'
								className={`${cl.btn} ${!(isValid && dirty) ? cl.disabled : cl.enabled}`}
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
