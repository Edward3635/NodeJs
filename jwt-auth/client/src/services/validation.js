import * as Yup from 'yup'

export const validationSchema = Yup.object().shape({
	email: Yup.string().email('Input coorect email').required('Required'),
	password: Yup.string()
		.min(3, 'Password must containt at least 3 symbols ')
		.max(32, "Password can't contain more than 32 symbols")
		.required('Required')
})
