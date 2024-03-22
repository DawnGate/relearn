import * as Yup from 'yup'

export const logInScheme = Yup.object().shape({
	email: Yup.string().required('Account email is required').email('Please enter the correct email'),
	password: Yup.string()
		.required('Please enter the login password')
		.min(6, 'The minimum password length is 6 characters'),
})

export const registerSchema = Yup.object().shape({
	name: Yup.string()
		.required('Please enter the account name')
		.min(3, 'Minimum three digits of the account name'),
	email: Yup.string().required('Account email is required').email('Please enter the correct email'),
	password: Yup.string()
		.required('Please enter the login password')
		.min(6, 'The minimum password length is 6 characters'),
	confirmPassword: Yup.string()
		.required('Please enter the confirmation password again')
		.oneOf([Yup.ref('password')], 'Confirm the password is incorrect'),
})
