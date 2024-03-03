import React, { FC, useState } from 'react'
import cl from '../style/App.module.scss'
import { useAppDisptach } from '../hooks/redux'
import { login, registration } from '../redux/authSlice'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { validationSchema } from '../services/validation'
import { IFormInitVal } from '../types/formInitialVal'

const LoginForm: FC = () => {
	const [submitType, setSubmitType] = useState<string>('')
	const dispatch = useAppDisptach()

	const initialValues: IFormInitVal = {
		email: '',
		password: ''
	}

	const handleSubmit = (values: IFormInitVal) => {
		if (submitType === 'registration') dispatch(registration(values))
		else if (submitType === 'login') dispatch(login(values))
	}

	return (
		<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
			{({ errors, touched }) => (
				<Form>
					<Field
						type='email'
						name='email'
						className={`${cl.input} ${errors.email && touched.email ? cl.inputError : null}`}
						placeholder='Email'
					/>
					{errors.email && touched.email ? <div className={cl.error}>{errors.email}</div> : null}
					<Field
						type='password'
						name='password'
						className={`${cl.input} ${errors.password && touched.password ? cl.inputError : null}`}
						placeholder='Password'
					/>
					{errors.password && touched.password ? <div className={cl.error}>{errors.password}</div> : null}
					<div className={cl.btns_container}>
						<button onClick={() => setSubmitType('login')} className={cl.btn}>
							Login
						</button>
						<button onClick={() => setSubmitType('registration')} className={cl.btn}>
							Registration
						</button>
					</div>
				</Form>
			)}
		</Formik>
	)
}

export default LoginForm
