'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import { LoginForm, Logo } from '@/components'
import { useLoginMutation } from '@/store/services/user.service'

import { LoginImpl } from '@/types'
import { HandleResponse } from '@/components/common/HandleResponse'
import { useAppDispatch } from '@/store/hooks'
import { userLogin } from '@/store/slices/user.slice'

const LoginPage = () => {
	const { replace } = useRouter()
	const searchParams = useSearchParams()
	const redirectTo = searchParams.get('redirectTo') || '/'

	const appDispatch = useAppDispatch()

	const [login, { data, isSuccess, isError, isLoading, error }] = useLoginMutation()

	const submitHandler = async (validatedData: LoginImpl) => {
		const { email, password } = validatedData
		if (email && password) {
			await login({
				body: {
					email,
					password,
				},
			})
		}
	}

	return (
		<>
			{(isSuccess || isError) && (
				<HandleResponse
					isError={isError}
					isSuccess={isSuccess}
					error={error}
					message={data?.message || ''}
					onSuccess={() => {
						appDispatch(userLogin(data?.data.token || ''))
						replace(redirectTo)
					}}
				/>
			)}
			<main className='grid min-h-screen items-center'>
				<section className='container max-w-md space-y-6 px-12 py-6 lg:rounded-lg lg:border lg:border-gray-100 lg:shadow'>
					<Link href='/' passHref>
						<Logo className='mx-auto h-24 w-48' />
					</Link>
					<h1>
						<p>Log in</p>
					</h1>
					<LoginForm isLoading={isLoading} onSubmit={submitHandler} />
					<div className='text-xs'>
						<p className='mr-2 inline text-xs text-gray-800'>I don&apos;t have account yet</p>
						<Link href='/register' className='text-xs text-blue-400'>
							Go to register
						</Link>
					</div>
				</section>
			</main>
		</>
	)
}

export default LoginPage
