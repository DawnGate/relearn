import { EmptySearch } from '@/components'
import Image from 'next/image'

export const EmptySearchList = () => {
	return (
		<div className='py-20'>
			<EmptySearch className='mx-auto h-60 w-60' />
			<div className='mx-auto max-w-md space-y-2 rounded-md border p-2'>
				<div className='flex items-center gap-x-2'>
					<Image src='/icons/exclamation.svg' alt='exclamation' width={32} height={32} />
					<h5>No results found</h5>
				</div>
				<p className='text-gray-500'>Use more variable words or check input properties</p>
			</div>
		</div>
	)
}
