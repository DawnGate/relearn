'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Icons } from '@/components'

export const SignUp = () => {
	const pathname = usePathname()
	// TODO Display when verify user
	const isVerifyUser = false

	if (!isVerifyUser) {
		return (
			<div className='flex-center gap-x-3 text-sm lg:rounded-md lg:border lg:border-gray-300 lg:px-3 lg:py-2'>
				<Link href={`/register?redirectTo=${pathname}`} className='hidden px-2 lg:block'>
					Register
				</Link>
				<span className='hidden h-6 w-0.5 bg-gray-300 lg:block'></span>
				<Link href={`/login?redirectTo=${pathname}`} className='flex-center gap-x-1'>
					<p>Log in</p>
					<Icons.Login className='icon' />
				</Link>
			</div>
		)
	} else {
		return <div>Todo</div>
	}
}
