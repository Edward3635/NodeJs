import React from 'react'
import { useDispatch } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import cl from './OrderForm.module.scss'
import { validationHistorySchema } from '../../../../services/historyValidation'
import { getUserOrders } from '../../../../redux/historySlice'

const OrderForm = () => {
	const dispatch = useDispatch()

	const initialValues = {
		email: '',
		phone: ''
	}

	const handleSubmit = values => {
		dispatch(getUserOrders(values))
	}

	return (
		<Formik initialValues={initialValues} validationSchema={validationHistorySchema} onSubmit={handleSubmit}>
			{({ errors, touched, isValid, dirty }) => (
				<Form className={cl.userData}>
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

					<button
						disabled={!(isValid && dirty)}
						type='submit'
						className={`${cl.btn} ${!(isValid && dirty) ? cl.disabled : cl.enabled}`}
					>
						Submit
					</button>
				</Form>
			)}
		</Formik>
	)
}

export default OrderForm
