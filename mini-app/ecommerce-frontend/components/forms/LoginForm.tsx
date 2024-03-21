'use client'

import { SubmitHandler, useForm } from 'react-hook-form'

import { useEffect } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'

import { logInScheme } from '@/utils'

import { TextField, LoginButton } from '@/components'

import { LoginImpl } from '@/types'

interface Props {
	isLoading: boolean
	onSubmit: any
}

export const LoginForm = ({ isLoading, onSubmit }: Props) => {
	const {
		control,
		handleSubmit,
		setFocus,
		formState: { errors: formErrors },
	} = useForm<LoginImpl>({
		resolver: yupResolver(logInScheme),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const onHandleSubmit: SubmitHandler<FormInput> = data => {
		onSubmit(data)
	}

	useEffect(() => {
		setFocus('email')
	}, [setFocus])

	return (
		<form className='space-y-4' onSubmit={handleSubmit(onHandleSubmit)} autoComplete='off'>
			<TextField
				errors={formErrors.email}
				placeholder='Please enter your account email'
				name='email'
				control={control}
			/>
			<TextField
				errors={formErrors.password}
				placeholder='Please enter your account password'
				name='password'
				type='password'
				control={control}
			/>
			<LoginButton isLoading={isLoading}>Log in</LoginButton>
		</form>
	)
}
