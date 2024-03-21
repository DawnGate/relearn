import Link from 'next/link'

const LoginPage = () => {
	return (
		<>
			<main className='grid min-h-screen items-center'>
				<section className='container max-w-md space-y-6 px-12 py-6 lg:rounded-lg lg:border lg:border-gray-100 lg:shadow'>
					<Link href='/' passHref>
						<div>Hello</div>
					</Link>
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
