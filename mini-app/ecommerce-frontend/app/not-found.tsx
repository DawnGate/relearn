import { ArrowLink, ClientLayout, ResponsiveImage } from '@/components'

const NotFoundPage = () => {
	return (
		<ClientLayout>
			<main className='flex flex-col items-center justify-center gap-y-6 py-8 xl:mt-28'>
				<p className='text-base font-semibold text-black'>404 Not found!</p>
				<ArrowLink path='/'>Return to homepage</ArrowLink>
				<ResponsiveImage
					dimensions='w-full max-w-lg h-72'
					src='/icons/page-not-found.png'
					alt='404'
				/>
			</main>
		</ClientLayout>
	)
}

export default NotFoundPage
