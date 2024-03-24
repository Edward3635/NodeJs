import * as Yup from 'yup'

export const validationShoppingSchema = Yup.object().shape({
	name: Yup.string().min(3, 'Name must containt at least 3 symbols ').required('Required'),
	email: Yup.string().email('Input corect email').required('Required'),
	phone: Yup.string()
		.matches(/^0\d{9}$/, 'Phone number must start with 0 and contain 10 digits')
		.required('Required'),
	address: Yup.string().required('Required'),
	coupon: Yup.string()
})
