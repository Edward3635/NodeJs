import * as Yup from 'yup'

export const validationSchema = Yup.object().shape({
	name: Yup.string().min(3, 'Name must containt at least 3 symbols ').required('Required'),
	email: Yup.string().email('Input corect email').required('Required'),
	phone: Yup.number().typeError('Input a valid number').required('Required'),
	address: Yup.string().required('Required')
})
