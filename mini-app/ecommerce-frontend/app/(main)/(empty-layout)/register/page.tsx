'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import { useDisclosure } from '@/hooks'

import { HandleResponse, LoginButton, Logo, RedirectToLogin, TextField } from '@/components'

import { yupResolver } from '@hookform/resolvers/yup'

import { RegisterImpl } from '@/types'
import { registerSchema } from '@/utils'

import { useCreateUserMutation } from '@/store/services'
import { useAppDispatch } from '@/store/hooks'
import { userLogin } from '@/store/slices'

const LoginPage = () => {
	const { replace } = useRouter()
	const searchParams = useSearchParams()
	const redirectTo = searchParams.get('redirectTo') || '/'
	const appDispatch = useAppDispatch()

	const [isShowRedirectModal, redirectModalHandlers] = useDisclosure()

	const {
		control,
		handleSubmit,
		setFocus,
		formState: { errors: formErrors },
		reset,
	} = useForm<RegisterImpl>({
		resolver: yupResolver(registerSchema),
		defaultValues: {
			email: '',
			name: '',
			password: '',
			confirmPassword: '',
		},
	})

	const [createUser, { data, isSuccess, isError, isLoading, error }] = useCreateUserMutation()

	const onError = () => {
		if (error && 'status' in error) {
			if (error.status === 422) {
				redirectModalHandlers.open()
			}
		}
	}
	const onSuccess = () => {
		appDispatch(userLogin(data?.data.token || ''))
		console.log(data)
		reset()
		replace(redirectTo)
	}

	const submitHandler = async (validatedData: RegisterImpl) => {
		const { email, name, password } = validatedData
		if (email && password && name) {
			console.log(email, password, name)
			await createUser({
				body: {
					email,
					password,
					name,
				},
			})
		}
	}

	useEffect(() => {
		setFocus('name')
	}, [setFocus])

	return (
		<>
			<RedirectToLogin
				title='Registration exception'
				text='Hello'
				onClose={redirectModalHandlers.close}
				isShow={isShowRedirectModal}
			/>
			{(isSuccess || isError) && (
				<HandleResponse
					isError={isError}
					isSuccess={isSuccess}
					error={error}
					message={data?.message || ''}
					onSuccess={onSuccess}
					onError={onError}
				/>
			)}
			<main className='grid min-h-screen items-center'>
				<section className='container max-w-md space-y-6 px-12 py-6 lg:rounded-lg lg:border lg:border-gray-100 lg:shadow'>
					<Link href='/' passHref>
						<Logo className='mx-auto h-24 w-48' />
					</Link>
					<h1>
						<p>Register</p>
					</h1>
					<form className='space-y-4' onSubmit={handleSubmit(submitHandler)}>
						<TextField
							errors={formErrors.name}
							name='name'
							control={control}
							placeholder='Please enter you account name'
						/>
						<TextField
							errors={formErrors.email}
							name='email'
							control={control}
							placeholder='Please enter you account email'
						/>
						<TextField
							errors={formErrors.password}
							type='password'
							name='password'
							control={control}
							placeholder='Please enter you account password'
						/>
						<TextField
							errors={formErrors.confirmPassword}
							name='confirmPassword'
							type='password'
							control={control}
							placeholder='Confirm password, please enter again'
						/>
						<LoginButton isLoading={isLoading}>Register</LoginButton>
					</form>

					<div className='text-xs'>
						<p className='mr-2 inline text-xs text-gray-800'>I already have an account</p>
						<Link href='/login' className='text-xs text-blue-400'>
							Go to login
						</Link>
					</div>
				</section>
			</main>
		</>
	)
}

export default LoginPage
