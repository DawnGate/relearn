import Link from 'next/link'
import { CartBadge, CartDropdown } from '@/components'

export const Cart = () => {
	// TODO: Cart dropdown
	return (
		<>
			<Link href='/checkout/cart' className='lg:hidden'>
				<CartBadge />
			</Link>
			<div className='hidden lg:block'>
				<CartDropdown />
			</div>
		</>
	)
}
