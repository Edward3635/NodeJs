import * as Yup from 'yup'

export const validationHistorySchema = Yup.object().shape({
	email: Yup.string().email('Input corect email').required('Required'),
	phone: Yup.string()
		.matches(/^0\d{9}$/, 'Phone number must start with 0 and contain 10 digits')
		.required('Required')
})
