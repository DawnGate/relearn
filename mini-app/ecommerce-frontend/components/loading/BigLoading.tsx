import { Loading, Logo } from '@/components'

export const BigLoading = () => {
	return (
		<div className='mx-auto max-w-max space-y-10 rounded-lg bg-red-100/90 p-8 text-center'>
			<Logo className='mx-auto h-12 w-40' />
			<Loading />
		</div>
	)
}
