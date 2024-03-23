import { Icons } from '@/components'

export const CartBadge = () => {
	// TODO: Cart badge items
	return (
		<div className='relative'>
			<span className='absolute bottom-3.5 left-5 h-5 w-5 rounded-md bg-red-500 p-0.5 text-center text-xs text-white outline outline-2'>
				10
			</span>
			<Icons.Cart className='icon h-7 w-7' />
		</div>
	)
}
