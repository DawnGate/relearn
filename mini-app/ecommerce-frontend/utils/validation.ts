import * as Yup from 'yup'

export const logInScheme = Yup.object().shape({
	email: Yup.string().required('Account email is required').email('Please enter the correct email'),
	password: Yup.string()
		.required('Please enter the login password')
		.min(6, 'The minimum password length is 6 characters'),
})
